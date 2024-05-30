const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');

const create = (req, res, next) => {
    const schema = Joi.object().keys({
        firstName: Joi.string()
            .min(3)
            .max(10)
            .required(),
        lastName: Joi.string()
            .min(3)
            .max(10)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        masterEmail: Joi.string()
        .email()
        .required(),
        role: Joi.string()
            .required(),
        avatar: Joi.string()
            .allow(''),
        company_id: Joi.number()
            .required()
        
    });
    validatorHandler(req, res, next, schema);
};


const update = (req, res, next) => {
    const schema = Joi.object().keys({
        id: Joi.number()
            .required(),
        firstName: Joi.string()
            .min(3)
            .max(10)
            .required(),
        lastName: Joi.string()
            .min(3)
            .max(10)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        role: Joi.string()
            .required(),
        status: Joi.string()
            .required(),
        avatar: Joi.string()
            .allow(''),
        company_id: Joi.number()
        .required(),
    });
    validatorHandler(req, res, next, schema);
};

module.exports = {
    create,
    update
};