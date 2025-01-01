import express from 'express';
import TransactionController from '../controllers/TransactionController.js';

// api/transaction
const router = express.Router();

router.post('/payment', TransactionController.payment);

router.post('/return/:id', TransactionController.returnTransaction);

router.get('/:accountId', TransactionController.getAllTransactionsFromAccount);


export default router;
