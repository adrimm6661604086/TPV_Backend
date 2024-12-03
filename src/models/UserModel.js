// Libraries
import { v4 as uuidv4 } from 'uuid';
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';


// Utils
import logger from '../logger.js';
import { db } from '../db.js';

/**
 * Modelo de User.
 */
class UserModel extends Model {
    /**
     * @param {string} id - UUID del usuario.
     * @param {string} name - Nombre del usuario.
     * @param {string} lastName - Apellido del usuario.
     * @param {string} email - Email del usuario.
     * @param {string} password - Contraseña del usuario.
     * @param {string} DNI - Documento de Identidad.
     * @param {string} [phoneNumber] - Número de teléfono.
     * @param {string} [address] - Dirección.
     * @param {string} [postalCode] - Código postal.
     * @param {string} [city] - Ciudad.
     * @param {string} [country] - País.
     * @param {Date} [createdAt] - Fecha de creación.
     */

    static async createUser({ name, lastName, email, password, DNI, phoneNumber, address, postalCode, city, country }) {
      const hashedPassword = bcrypt.hashSync(password, 10); 
      const newUser = await this.create({
        name,
        lastName,
        email,
        password: hashedPassword,
        DNI,
        phoneNumber,
        address,
        postalCode,
        city,
        country,
      });
      return newUser;
    }

    /**
     * Hash de la contraseña.
     * @param {string} password
     * @returns {string} - Contraseña encriptada.
     */
    static async hashPassword(password) {
      return bcrypt.hashSync(password, 10);
    }

    /**
     * Compara la contraseña encriptada con la contraseña en texto plano.
     * @param {string} plainPassword
     * @param {string} encryptedPassword
     * @returns {boolean}
     */
    static async comparePasswords(plainPassword, encryptedPassword) {
      return bcrypt.compare(plainPassword, encryptedPassword);
    }


  }
  
UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DNI: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db, 
    modelName: 'User',
    tableName: 'User',
  }
);

db.sync();

export default UserModel;