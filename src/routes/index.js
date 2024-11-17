const express = require('express');
const { initiatePayment } = require('../controllers/paymentController');
const { validatePayment } = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/pay', validatePayment, initiatePayment);

module.exports = router;
