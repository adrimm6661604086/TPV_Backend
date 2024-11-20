/**
 * Modelo de Transaction.
 */
export default class Transaction {
    /**
     * @param {string} id - UUID de la transacción.
     * @param {string} userAccountId - ID de la cuenta de usuario asociada.
     * @param {string} creditCardNumber - Número de la tarjeta de crédito.
     * @param {'Visa' | 'MasterCard' | 'AmericanExpress'} creditCardHolder - Tipo de tarjeta.
     * @param {Date} expirationDate - Fecha de expiración de la tarjeta.
     * @param {string} cvc - Código CVC.
     * @param {number} amount - Cantidad de la transacción.
     * @param {Date} [transactionDate] - Fecha de la transacción.
     * @param {'PAYMENT' | 'WITHDRAWAL' | 'RETURN'} transactionType - Tipo de transacción.
     * @param {'BankSim' | 'BBVA' | 'Caixabank' | 'Santander'} bankEntity - Entidad bancaria.
     */
    constructor({
      id,
      userAccountId,
      creditCardNumber,
      creditCardHolder,
      expirationDate,
      cvc,
      amount,
      transactionDate = new Date(),
      transactionType,
      bankEntity,
    }) {
      this.id = id;
      this.userAccountId = userAccountId;
      this.creditCardNumber = creditCardNumber;
      this.creditCardHolder = creditCardHolder;
      this.expirationDate = expirationDate;
      this.cvc = cvc;
      this.amount = amount;
      this.transactionDate = transactionDate;
      this.transactionType = transactionType;
      this.bankEntity = bankEntity;
    }
  }
  