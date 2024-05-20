const db = require('../config/db.config');
const { logger } = require('../utils/logger');

class Company {
    static getCompanyIdByCNPJ(cnpj, cb) {
        db.query(`SELECT company_id FROM companies WHERE cnpj = '${cnpj}'`,  (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]?.company_id);
                return;
            }
            cb(null, 0);
        })
    }
}

module.exports = Company;