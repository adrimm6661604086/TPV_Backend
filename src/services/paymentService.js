import { post } from 'axios';
import { BANK_API_URL, BANK_API_KEY } from '../config';

const processPayment = async (paymentDetails) => {
    try {
        const response = await post(
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

export default { processPayment };
