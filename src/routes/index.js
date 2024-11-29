import express from 'express';
import userRoutes from './UserRoutes.js';
import transactionRoutes from './TransactionRoutes.js';
import logger from '../logger.js';


const router = express.Router();

router.get('/', (req, res) => {
    logger.info('Acceso a la raíz de la API');
    res.json({ message: '¡Bienvenido a la API de TPVVirtual!' });
});

router.get('/pay', (req, res) => {
    res.json({ message: 'PAGAMEEE!' });
});

router.use('/user', userRoutes);
router.use('/account', accountRoutes);
router.use('/transactions', transactionRoutes);



export default router;