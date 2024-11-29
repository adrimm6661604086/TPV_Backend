//Libraries
import { Sequelize } from 'sequelize';

// Utils
import config from '../../config.js';
import logger from '../../logger.js';

const db = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: config.DB_SERVER,
  logging: false, 
  define: {
    freezeTableName: true, 
  },
  pool: {
    max: 5, 
    min: 0,  
    acquire: 30000, 
    idle: 10000,  
  },
});

const connectDb = async () => {
  try {
    await db.authenticate();
    logger.info('Conexión a la base de datos MySQL establecida correctamente');
  } catch (err) {
    logger.error('Error al conectar a la base de datos MySQL: ', err);
    throw err;  
  }
};

export { db, connectDb };
