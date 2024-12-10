// Libraries
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';

// Utils
import { db } from '../db.js';



/**
 * Modelo de UserAccount.
 */
class UserAccountModel extends Model {
  /**
   * @param {string} id - UUID de la cuenta.
   * @param {string} userId - ID del usuario asociado.
   * @param {string} IBAN - Código IBAN.
   * @param {'BankSim' | 'BBVA' | 'Caixabank' | 'Santander'} bankEntity - Entidad bancaria.
   */
  static async createUserAccount({ userId, IBAN, bankEntity }) {
    if (!IBAN || !bankEntity) {
      throw new Error('IBAN and bankEntity cannot be null');
    }
    const linkedBankAccount = await this.create({
      userId,
      IBAN,
      bankEntity
    });
    return linkedBankAccount;
  } 
}

UserAccountModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  IBAN: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bankEntity: {
    type: DataTypes.ENUM('BankSim', 'BBVA', 'Caixabank', 'Santander'),
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'UserAccount'
});

db.sync();

export default UserAccountModel;