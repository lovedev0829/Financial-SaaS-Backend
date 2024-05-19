const db = require('../config/db.config');
const { logger } = require('../utils/logger');

class CompanyProspect {
     static create(newCompany, cb) {

        db.query(`INSERT INTO companies_propects (user_id, call_phone, company, cnpj, site, message, created_at) VALUES (
            '${newCompany.user_id}', 
            '${newCompany.callPhone}',
            '${newCompany.company}',
            '${newCompany.cnpj}',
            '${newCompany.site}',
            '${newCompany.message}',
            '${newCompany.created_at}'
        )`, (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    company_prospect_id: res.insertId,
                });
        });
    }
}

module.exports = CompanyProspect;