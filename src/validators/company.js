const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');

const update = (req, res, next) => {
    const schema = Joi.object().keys({
        id: Joi.number()
            .allow(),
        company_id: Joi.string()
            .required(),
        company_nick_name: Joi.string()
            .required(),
        company_name: Joi.string()
            .required(),
        cnpj: Joi.string()
            .required(),
        institution_type: Joi.string()
            .required(),
        company_address: Joi.string()
            .required(),
        business_email: Joi.string()
            .email()
            .required(),
        status: Joi.string()
            .required(),
        cetip_account_num: Joi.string()
            .required(),
        
    });
    validatorHandler(req, res, next, schema);
};


const trash = (req, res, next) => {
    const schema = Joi.object().keys({
        selectedIds: Joi.string()
            .required()
    });
    validatorHandler(req, res, next, schema);
};
    


module.exports = {
    update,
    trash
};