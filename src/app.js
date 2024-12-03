// Libraries
import express from 'express';
import cors from 'cors';

// Utils
import router from './routes/index.js';
import { PORT } from './config.js';
import { connectDb } from './db.js'; 

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err);
    // process.exit(1); 
  }
};

startServer();

export default app;
