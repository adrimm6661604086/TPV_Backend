import processPayment from '../services/paymentService';

const initiatePayment = async (req, res) => {
    try {
        const paymentDetails = req.body;
        const result = await processPayment(paymentDetails);
        res.status(200).json({ message: 'Payment processed successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { initiatePayment };
