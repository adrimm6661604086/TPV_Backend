import express from 'express';
import { PORT } from './config.js';
import router from './routes/index.js';

const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
