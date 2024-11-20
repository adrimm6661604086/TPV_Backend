import { object, string, number } from 'joi';

const validatePayment = (req, res, next) => {
    const schema = object({
        cardNumber: string().creditCard().required(),
        expirationDate: string().pattern(/^\d{2}\/\d{2}$/).required(),
        cvv: string().length(3).required(),
        amount: number().positive().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export default { validatePayment };
