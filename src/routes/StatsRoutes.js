import express from 'express';
import StatsController from '../controllers/StatsController';
import UserAccountController from '../controllers/UserAccountController';
import TransactionController from '../controllers/TransactionController';

// api/stats
const router = express.Router();

router.get('/stats?filter', StatsController.getStats);
