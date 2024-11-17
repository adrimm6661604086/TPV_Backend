const axios = require('axios');
const { BANK_API_URL, BANK_API_KEY } = require('../config');

const processPayment = async (paymentDetails) => {
    try {
        const response = await axios.post(
            `${BANK_API_URL}/payments`,
            paymentDetails,
            { headers: { Authorization: `Bearer ${BANK_API_KEY}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error processing payment:', error.response?.data || error.message);
        throw new Error('Payment processing failed');
    }
};

module.exports = { processPayment };
