const Joi = require('joi');

const validatePayment = (req, res, next) => {
    const schema = Joi.object({
        cardNumber: Joi.string().creditCard().required(),
        expirationDate: Joi.string().pattern(/^\d{2}\/\d{2}$/).required(),
        cvv: Joi.string().length(3).required(),
        amount: Joi.number().positive().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = { validatePayment };
