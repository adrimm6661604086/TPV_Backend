import express from 'express';
import userRoutes from './UserRoutes.js';
import transactionRoutes from './TransactionRoutes.js';


const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: '¡Bienvenido a la API de TPVVirtual!' });
});

router.get('/pay', (req, res) => {
    res.json({ message: 'PAGAMEEE!' });
});

router.use('/user', userRoutes);
router.use('/account', accountRoutes);
router.use('/transactions', transactionRoutes);



export default router;