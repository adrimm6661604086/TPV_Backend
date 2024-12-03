//Libraries
import { Sequelize } from 'sequelize';

// Utils
import { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_SERVER } from './config.js';
import logger from './logger.js';

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  logging: true,
  host: DB_HOST,
  dialect: DB_SERVER,
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
    db.sync({ alter: true })  
      .then(() => {
        logger.info('Base de datos sincronizada');
      })
      .catch(err => {
        logger.error('Error sincronizando la base de datos:', err);
      });

    logger.info('Conexión a la base de datos MySQL establecida correctamente');
  } catch (err) {
    logger.error('Error al conectar a la base de datos MySQL: ', err);
    throw err;  
  }
};

export { db, connectDb };
