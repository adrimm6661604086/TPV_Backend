// Model
import BankAccountModel from '../models/BankAccountModel.js';

// Utils
import logger from '../logger.js';

class UserAccountController {
  /**
   * Vincula una cuenta bancaria a un nuevo usuario.
   * @param {Object} - Datos de la cuenta bancaria.
   * @param {String} - ID del usuario.
   * @returns {Object} - Cuenta bancaria.
   */
  static async registerUserAccount({userId, IBAN, bankEntity}) {
    try {
      const newUserAccount = await BankAccountModel.create({
        userId,
        IBAN,
        bankEntity
      });
      
      return newUserAccount;
    } catch (error) {
      logger.error(`Error al registrar la cuenta bancaria ${error}`);
      throw error;
    }
  };

  /**
   * Obtiene la información de la cuenta bancaria de un usuario.
   * @param {String} - ID del usuario.
   * @returns {Object} - Cuenta bancaria.
   */
  static async getAccountInfo(req, res) {
    const { userId } = req.params;

    try {
      const bankAccount = await BankAccountModel.findOne({ where: { userId } });
      if (!bankAccount) {
        logger.error('No se ha encontrado la cuenta bancaria');
        return res.status(404).json({ 
          status: 404,
          message: 'No se ha encontrado la cuenta bancaria' 
        });
      }

      const { IBAN, bankEntity } = bankAccount;
      return res.status(200).json({ 
        status: 200,
        bankData: {
          IBAN,
          bankEntity
        }
      });
    } catch (error) {
      logger.error(`Error al recuperar la cuenta bancaria ${error}`);
      return res.status(500).json({ 
        status: 500,
        message: 'Error al obtener la información de la cuenta bancaria' 
      });
    }
  };

  /**
   * Actualiza la información de la cuenta bancaria de un usuario.
   * @param {String} - ID del usuario.
   * @param {Object} - Datos de la cuenta bancaria.
   * @returns {Object} - Cuenta bancaria actualizada.
   */
  static async updateBankInfo(req, res) {
    const { userId } = req.body;
    const { IBAN, bankEntity } = req.body;

    try {
      const bankAccount = await UserAccount.updateBankInfo({ userId }, { IBAN, bankEntity });
      if (!bankAccount) {
        logger.error('No se ha encontrado la cuenta bancaria');
        return res.status(404).json({ 
          status: 404,
          message: 'No se ha encontrado la cuenta bancaria' 
        });
      }
    } catch (error) {
      logger.error(`Error al actualizar la cuenta bancaria ${error}`);
      return res.status(500).json({ 
        status: 500,
        message: 'Error al actualizar la información de la cuenta bancaria' 
      });
    }
  };

}

export default UserAccountController;
