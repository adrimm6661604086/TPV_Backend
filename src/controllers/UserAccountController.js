// Model
import UserAccountModel from '../models/UserAccount.js';

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
      const newUserAccount = await UserAccountModel.create({
        userId,
        IBAN,
        bankEntity
      });
      
      return newUserAccount;
    } catch (error) {
      logger.error(error);
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
      const bankAccount = await UserAccountModel.findOne({ userId });
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
      logger.error(error);
      return res.status(500).json({ 
        status: 500,
        message: 'Error al obtener la información de la cuenta bancaria' 
      });
    }
  };

}

export default UserAccountController;
