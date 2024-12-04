// Model
import UserModel from '../models/UserModel.js';

// Utils
import logger from '../logger.js';

// Libraries
import jwt from 'jsonwebtoken';

// Utils
import { JWT_SECRET } from '../config.js';


class UserController {
  /**
   * Registra un nuevo usuario.
   * @param {Object} - Datos del usuario.
   * @returns {Object} - Mensaje de éxito o error.
   * @throws {Error} - Si faltan campos obligatorios.
   * @throws {Error} - Si el usuario ya existe.
   */
  static async registerUser(req, res) {
    const { name, lastName, email, password, DNI, phoneNumber, address, postalCode, city, country } = req.body;
  
    const oldUser = await UserModel.findOne({ where: { email } });
    if (oldUser) {
      logger.error('El usuario ya existe');
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await UserModel.hashPassword(password); 
    
    try {
      const newUser = await UserModel.create({
        name,
        lastName,
        email,
        password: hashedPassword,
        DNI,
        phoneNumber,
        address,
        postalCode,
        city,
        country
      });

      logger.info('Usuario creado correctamente');
      return res.status(201).json({ 
        status: 201,
        message: 'Usuario creado correctamente'
      });
    } catch (error) {
      logger.error(`Error al crear el usuario: ${error.message}`);
      return res.status(500).json({ 
        status: 500,
        message: 'Error interno del servidor', 
        error: error.message 
      });
    } 
  };

  /**
   * Inicia sesión de un usuario.
   * @param {Object} - Datos de Inicio de Sesión.
   * @returns {Object} - Mensaje de éxito o error.
   * @throws {Error} - Si el usuario no existe.
   * @throws {Error} - Si la contraseña es incorrecta.
   */
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
    
      const user = await UserModel.findOne({ where: { email } });
      if (!user) {
        logger.error('El usuario no existe');
        return res.status(404).json({ message: 'El usuario no existe' });
      }
      
      const isPasswordValid = UserModel.comparePasswords(password, user.password);
      if (!isPasswordValid) {
        logger.error('Contraseña incorrecta');
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }
      logger.info('Credenciales de usuario válidas');

      // const otp = generateOTP();
      // console.log(otp);
      // await sendEmail(email, otp);

      const token = jwt.sign(
        { id: user.id, email: user.email }, 
        JWT_SECRET,              
        { expiresIn: '1h' }                 
      );

      const { id, userPassword, createdAt, ...userResponse } = user.toJSON();

      res.status(200).json({ 
        status: 200,
        message: 'Código OTP enviado correctamente',
        // user: userResponse,
        token: token
      });
     
    } catch (error) {
      logger.error(`Error al loguear el usuario: ${error.message}`);
      return res.status(500).json({ 
        status: 500,
        message: 'Error interno del servidor', 
        error: error.message 
      });
    }
  }

  /**
   * Obtiene la información de un usuario.
   * @param {Object} - Datos del usuario.
   * @returns {Object} - Información del usuario.
   * @throws {Error} - Si el usuario no existe.
   */
  static async getUserInfo(req, res) {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ where: { email } });
      
      if (!user) {
        logger.error('El usuario no existe');
        return res.status(404).json({ message: 'El usuario no existe' });
      }

      logger.info('Usuario encontrado');
      const { id, password, createdAt, ...userResponse } = user.toJSON();

      return res.status(200).json({ 
        status: 200,
        message: 'Información del usuario obtenida correctamente',
        user: userResponse });
    } catch (error) {
      logger.error(`Error al obtener la información del usuario: ${error.message}`);
      return res.status(500).json({ 
        status: 500,
        message: 'Error interno del servidor', 
        error: error.message 
      });
    }
  }
}

export default UserController;
