import joi from 'joi';

export const chargeValidation = joi.object({
    amount: joi.number().greater(0).required(),
    currency: joi.string().required(),
    source: joi.string().required(),
    email: joi.string().email().required()
});