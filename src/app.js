// Libraries
import express from 'express';
import cors from 'cors';

// Utils
import router from './routes/index.js';
import { PORT, BACKEND_URL } from './config.js';
import { connectDb } from './db.js'; 
import logger from './logger.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, '0.0.0.0', () => {
      logger.info(`Servidor corriendo en ${BACKEND_URL}:${PORT}`);
    });
  } catch (err) {
    logger.error('Error al conectar con la base de datos:', err);
    process.exit(1); 
  }
};

startServer();

export default app;
