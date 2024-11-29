// Libraries
import jwt from 'jsonwebtoken';

// Model
import UserModel from '../models/User.js';

// Utils
import logger from '../config/logger.js';
import config from '../config.js';


class UserController {
  /**
   * Registra un nuevo usuario.
   * @param {Object} - Datos del usuario.
   * @returns {Object} - Mensaje de éxito o error.
   * @throws {Error} - Si faltan campos obligatorios.
   * @throws {Error} - Si el usuario ya existe.
   */
  static async registerUser(req, res) {
    const { name, last_name, email, password, DNI, phone_number, address, postal_code, city, country } = req.body;
  
    const oldUser = await UserModel.findOne({ where: { email } });
    if (oldUser) {
      logger.error('El usuario ya existe');
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const encryptedPassword = await UserModel.hashPassword(password); 
    
    try {
      const newUser = await UserModel.create({
        name,
        last_name,
        email,
        password: hashedPassword,
        DNI,
        phone_number,
        address,
        postal_code,
        city,
        country
      });

      logger.info('Usuario creado correctamente');
      return res.status(201).json({ message: 'Usuario creado correctamente', user: newUser });
    } catch (error) {
      logger.error(`Error al crear el usuario: ${error.message}`);
      return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
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
      
      const isPasswordValid = await UserModel.comparePasswords(password, user.password);
      if (!isPasswordValid) {
        logger.error('Contraseña incorrecta');
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email }, 
        config.JWT_SECRET,              
        { expiresIn: '1h' }                 
      );
      
      const userResponse = { ...user.toJSON() };
      delete userResponse.password;

      logger.info('Usuario logueado correctamente');
      return res.json({ 
        message: 'Usuario logueado correctamente', 
        user: userResponse, 
        token: token
      });
    } catch (error) {
      logger.error(`Error al loguear el usuario: ${error.message}`);
      return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
  }
}

export default UserController;
