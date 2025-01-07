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
     * @param {string} id - UUID de la transacción.
     * @param {string} userAccountId - ID de la cuenta de usuario asociada.
     * @param {string} creditCardNumber - Número de la tarjeta de crédito.
     * @param {'Visa' | 'MasterCard' | 'AmericanExpress'} creditCardHolder - Tipo de tarjeta.
     * @param {Date} expirationDate - Fecha de expiración de la tarjeta.
     * @param {string} cvc - Código CVC.
     * @param {number} amount - Cantidad de la transacción.
     * @param {Date} [transactionDate] - Fecha de la transacción.
     * @param {'PAYMENT' | 'RETURN'} transactionType - Tipo de transacción.
     * @param {'BankSim' | 'BBVA' | 'Caixabank' | 'Santander'} bankEntity - Entidad bancaria.
     */
    static async createTransaction({ userAccountId, creditCardNumber, creditCardHolder, expirationDate, cvc, amount, transactionType, bankEntity }) {
      const transaction = await this.create({
          userAccountId,
          creditCardNumber,
          creditCardHolder,
          expirationDate,
          cvc,
          amount,
          transactionDate: new Date(),
          transactionType,
          bankEntity
      });
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