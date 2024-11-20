import Transaction from '../models/Transaction.js';

export default class TransactionController {
  static createTransaction(transactionData) {
    const transaction = new Transaction(transactionData);
    console.log('Transacción creada:', transaction);
    return transaction;
  }

  static getTransactionsByAccountId(accountId) {
    console.log('Buscando transacciones para la cuenta con ID:', accountId);
    return [];
  }
}
