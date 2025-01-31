import express from 'express';
import StatsController from '../controllers/StatsController.js';

// api/stats
const router = express.Router();

router.get('/:userId', StatsController.getStats);

export default router;
