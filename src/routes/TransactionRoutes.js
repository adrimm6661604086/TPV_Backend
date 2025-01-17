import express from 'express';
import TransactionController from '../controllers/TransactionController.js';

// api/transaction
const router = express.Router();

router.get('/:userId', TransactionController.getAllTransactionsFromAccount);

router.post('/payment', TransactionController.payment);

router.post('/return/:transactionId', TransactionController.returnTransaction);


export default router;
