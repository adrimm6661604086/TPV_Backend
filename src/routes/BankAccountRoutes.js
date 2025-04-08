import express from 'express';
import UserAccountController from '../controllers/BankAccountController.js';
import logger from '../logger.js';

const router = express.Router();

router.get('/:userId', UserAccountController.getAccountInfo);

router.put('/update-bankinfo', UserAccountController.updateBankInfo);

export default router;
