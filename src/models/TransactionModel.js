// Libraries
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';

// Utils
import { db } from '../db.js';


/**
 * Modelo de Transaction.
 */
class TransactionModel extends Model {
    /**
     * 
     * @description Crea una transacción.
     * 
     * @param {string} bankAccountId - ID de la cuenta bancaria.
     * @param {string} creditCardNumber - Número de tarjeta de crédito.
     * @param {string} last4Digits - Últimos 4 dígitos de la tarjeta.
     * @param {string} creditCardHolder - Nombre del titular de la tarjeta.
     * @param {Date} expirationDate - Fecha de expiración de la tarjeta.
     * @param {string} cvc - Código de verificación de la tarjeta.
     * @param {number} amount - Cantidad a pagar.
     * @param {'PAYMENT' | 'RETURN'} transactionType - Tipo de transacción.
     * @param {'BankSim' | 'BBVA' | 'Caixabank' | 'Santander'} bankEntity - Entidad bancaria.
     * @param {'Visa' | 'MasterCard' | 'AmericanExpress'} CardOrg - Organización de la tarjeta.
     * 
     * @returns {Promise<TransactionModel>} - Transacción creada.
     * @throws {Error} - Error de transacción.
     */
    static async createTransaction({ bankAccountId, creditCardNumber, last4Digits, creditCardHolder, expirationDate, cvc, amount, transactionType, bankEntity, CardOrg }) {
      const transaction = await this.create({
          bankAccountId,
          creditCardNumber,
          last4Digits,
          creditCardHolder,
          expirationDate,
          cvc,
          amount,
          transactionDate: new Date(),
          transactionType,
          bankEntity,
          CardOrg
      });
      return transaction;
    } 


    /**
     * @description Devuelve una transacción.
     * 
     * @param {string} transaction - Transacción a devolver.
     * 
     * @returns {Promise<TransactionModel>} - Transacción actual
     * @throws {Error} - Error de actualización.     
     */
    static async returnTransaction(transaction) {
      if (transaction.transactionType === 'PAYMENT') {
        transaction.returned = true;
      }
      
      await transaction.save();
      return transaction;
    }
  }
  
TransactionModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    bankAccountId: {
      type: DataTypes.UUID,
      references: {
        model: 'bankAccounts',
        tableName: 'bankaccounts',
        key: 'id',
      },
      allowNull: false,
    },
    creditCardNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last4Digits: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creditCardHolder: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CardOrg: {
      type: DataTypes.ENUM('Visa', 'MasterCard', 'AmericanExpress'),
      allowNull: false,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cvc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    transactionType: {
      type: DataTypes.ENUM('PAYMENT', 'RETURN'),
      allowNull: false,
    },
    returned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    bankEntity: {
      type: DataTypes.ENUM('BankSim', 'BBVA', 'Caixabank', 'Santander'),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: false,
  }
);

db.sync();

export default TransactionModel;