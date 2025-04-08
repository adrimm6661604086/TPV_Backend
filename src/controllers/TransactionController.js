// Model
import TransactionModel from '../models/TransactionModel.js';
import BankAccountModel from '../models/BankAccountModel.js';

// Libraries
import bcrypt from 'bcrypt';

// Logger
import logger from '../logger.js';

// Constants
import {BANK_API_URL} from '../config.js';



class TransactionController {
  /**
   * Create a transaction after a payment or withdrawal.
   * @param {Object} - Datos de pago.
   * @returns {Object} - Mensaje de éxito o error.
   * @throws {Error} - Si faltan campos obligatorios.
   * @throws {Error} - Si la tarjeta ha expirado.
   */
  static async payment(req, res) {
    const { userId, creditCardNumber, creditCardHolder, 
      expirationDate, cvc, amount} = req.body;

    if (!userId || !creditCardNumber || !creditCardHolder ||
      !expirationDate || !cvc || !amount ) {
      logger.error('Faltan campos obligatorios');
      return res.status(400).json({ 
        status: 400,
        message: 'Faltan campos obligatorios' 
      });
    }

    if (expirationDate < new Date()) {
      logger.error('La tarjeta ha expirado');
      return res.status(400).json({ 
        status: 400,
        message: 'La tarjeta ha expirado' 
      });
    }

    const AID = TransactionController.getCardOrgFromNumber(creditCardNumber);

    try {
      const bankAccount = await BankAccountModel.findOne({ where: { userId } });
      if (!bankAccount) {
        logger.error('Cuenta bancaria no encontrada');
        return res.status(404).json({
          status: 404,
          message: 'Cuenta bancaria no encontrada'
        });
      }

      const response = await fetch(`${BANK_API_URL}/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          creditCardNumber: creditCardNumber,
          creditCardHolder: creditCardHolder,
          expirationDate: expirationDate,
          CVC: cvc,
          IBANdst: bankAccount.IBAN,
          amount: amount
        }).toString()
      });

      const responseData = await response.json();
      logger.info(`Respuesta de la API del banco: ${responseData.message}`);

      if (response.status === 200) {
        logger.info('Tarjet de pago: **** ' + creditCardNumber.toString().slice(-4));
        const hashCreditCardNumber = await bcrypt.hash(creditCardNumber, 10);
        const hashCVC = await bcrypt.hash(cvc, 10);
        
        if (['Visa', 'MasterCard', 'AmericanExpress'].includes(AID)) {
          const transaction = await TransactionModel.createTransaction({
            bankAccountId: bankAccount.id,
            creditCardNumber: hashCreditCardNumber,
            last4Digits: creditCardNumber.toString().slice(-4),
            creditCardHolder,
            expirationDate,
            cvc: hashCVC,
            amount,
            transactionType: 'PAYMENT',
            bankEntity: 'BankSim',
            CardOrg: AID
          });

          logger.info('Transacción creada con éxito: ' + transaction.id);
          return res.status(201).json({
            status: 201,
            message: 'Transacción creada con éxito',
            transaction,
          });
        } else {
          logger.error('Tipo de tarjeta no soportado');
          return res.status(400).json({
            status: 400,
            message: 'Tipo de tarjeta no soportado'
          });
        }
      } else {
        const errorData = await response.json();
        logger.error(`Error en el pago: ${errorData.message}`);
        return res.status(response.status).json({
          status: response.status,
          message: errorData.message
        });
      }
    } catch(error) {
      logger.error(`Error al realizar el pago: ${error.message}`);
      return res.status(500).json({ 
        status: 500,
        message: 'Error interno del servidor', 
        error: error.message 
      });
    }
  }

  /**
   * Function to return a transaction.
   * @param {Object} - Datos de la transacción.  
   * @returns {Object} - Mensaje de éxito o error, si se ha devuelto el dinero correctamente.
   */
  static async returnTransaction(req, res) {
    const { creditCardNumber, creditCardHolder,
      expirationDate, cvc, userId} = req.body;
    const { transactionId } = req.params;
    

    try {
      const bankAccount = await BankAccountModel.findOne({ where: { userId } });
      if (!bankAccount) {
        logger.error('Cuenta bancaria no encontrada');
        return res.status(404).json({
          status: 404,
          message: 'Cuenta bancaria no encontrada'
        });
      }

      const transaction = await TransactionModel.findOne({
        where: {
          id: transactionId,
          bankAccountId: bankAccount.id
        }
      });

      if (!transaction) {
        logger.error('Transacción no encontrada');
        return res.status(404).json({ 
          status: 404,
          message: 'Transacción no encontrada' 
        });
      }

      const isCreditCardNumberValid = await bcrypt.compare(creditCardNumber, transaction.creditCardNumber);
      const isCreditCardHolderValid = transaction.creditCardHolder === creditCardHolder;
      const isCvcValid = await bcrypt.compare(cvc, transaction.cvc);

      logger.info(`Checks: ${isCreditCardNumberValid}, ${isCreditCardHolderValid} ${isCvcValid}`);

      if (!isCreditCardNumberValid || !isCreditCardHolderValid || !isCvcValid) {
        logger.error('Datos de la tarjeta incorrectos');
        return res.status(400).json({ 
          status: 400,
          message: 'Datos de la tarjeta incorrectos' 
        });
      }

      if (transaction.returned) {
        logger.error('La transacción ya ha sido devuelta');
        return res.status(400).json({ 
          status: 400,
          message: 'La transacción ya ha sido devuelta'
        });
      }
      
      const response = await fetch(`${BANK_API_URL}/return-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          creditCardNumber: creditCardNumber,
          creditCardHolder: creditCardHolder,
          expirationDate: expirationDate,
          CVC: cvc,
          IBANorig: bankAccount.IBAN,
          amount: transaction.amount
        }).toString()
      });

      const responseData = await response.json();
      logger.info(`Respuesta de la API del banco: ${responseData.message}`);

      
      const returnedTransaction = await TransactionModel.returnTransaction(transaction);

      const returnTransaction = await TransactionModel.createTransaction({
        bankAccountId: bankAccount.id,
        creditCardNumber: creditCardNumber,
        last4Digits: returnedTransaction.last4Digits,
        creditCardHolder: returnedTransaction.creditCardHolder,
        expirationDate: returnedTransaction.expirationDate,
        cvc: cvc,
        amount: returnedTransaction.amount,
        transactionType: 'RETURN',
        bankEntity: 'BankSim',
        CardOrg: returnedTransaction.CardOrg,
        returned: true,
      });

      logger.info('Transacción devuelta con éxito');
      return res.status(201).json({
        status: 201,
        message: 'Transacción devuelta con éxito',
        transaction: returnTransaction,
      });

      
          
    } catch(error) {
      logger.error(`Error al devolver la transacción: ${error.message}`);
      return res.status(500).json({ 
        status: 500,
        message: 'Error interno del servidor', 
        error: error.message 
      });
    }
  }

  /**
   * Function to get all transactions.
   * @param {id} - ID de la cuenta bancaria.
   * @returns {Object} - Mensaje de éxito
   */
  static async getAllTransactionsFromAccount(req, res) {
    const { userId } = req.params;
    
    if (!userId) {
      logger.error('Falta el ID de la cuenta bancaria');
      return res.status(400).json({ 
        status: 400,
        message: 'Falta el ID de la cuenta bancaria' 
      });
    }

    try {
      const bankAccount = JSON.stringify(await BankAccountModel.findOne({ where: { userId } }));
      
      if (!bankAccount) {
        logger.error('Cuenta bancaria no encontrada');
        return res.status(404).json({ 
          status: 404,
          message: 'Cuenta bancaria no encontrada' 
        });
      }

      const bankAccountParsed = JSON.parse(bankAccount);
      logger.info(`Bank account ID: ${bankAccountParsed.id}`);
      
      const transactions = await TransactionModel.findAll({ 
        where: { bankAccountId: bankAccountParsed.id }, 
        order: [['transactionDate', 'DESC']] 
      });

      if (!transactions) {
        logger.error('No hay transacciones');
        return res.status(404).json({ 
          status: 404,
          message: 'No hay transacciones'
        });
      }

      logger.info('Transacciones obtenidas con éxito');
      return res.status(200).json({
        status: 200,
        message: 'Transacciones obtenidas con éxito',
        transactions
      });
    } catch (error) {
      logger.error(`Error al obtener las transacciones: ${error.message}`);
      return res.status(500).json({ 
        status: 500,
        message: 'Error interno del servidor', 
        error: error.message 
      });
    }
  }

  static getCardOrgFromNumber(cardNumber) {
    if (/^4/.test(cardNumber)) {
      return 'Visa';
    } else if (/^5[1-5]/.test(cardNumber)) {
      return 'MasterCard';
    } else if (/^3[47]/.test(cardNumber)) {
      return 'AmericanExpress';
    }
    return null; 
  }
}

export default TransactionController;