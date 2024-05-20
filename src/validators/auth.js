const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');

const signup = (req, res, next) => {
    const schema = Joi.object().keys({
        firstName: Joi.string()
            .min(3)
            .max(50)
            .required(),
        lastName: Joi.string()
            .min(3)
            .max(50)
            .required(),
        callPhone: Joi.string()
            .required(),
        company: Joi.string()
            .required(),
        cnpj: Joi.string()
            .required(),
        site: Joi.string()
            .required(),
        message: Joi.string()
            .required(),
        email: Joi.string()
            .email()
            .required(),
        companyRole: Joi.string()
            .required(),
        
    });
    validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .trim()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'), "special character (@!#$%^&*-=+)")
            .required()
    });
    validatorHandler(req, res, next, schema);
};

module.exports = {
    signup,
    signin
};