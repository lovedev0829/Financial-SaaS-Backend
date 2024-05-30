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

    static getCompanyProspects (cb) {
        db.query(`SELECT t1.id as id, t1.avatar, t1.first_name, t1.last_name, t1.email, t1.role, t1.company_role, t1.company_id, t1.status, t1.created_at, 
                         t2.id as company_prospect_id, t2.call_phone, t2.company, t2.cnpj, t2.site, t2.message 
                 FROM users as t1 inner join companies_propects as t2 on (t1.id = t2.user_id) WHERE t1.role='master'`, 
                (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, res);
                return;
        });
    }

    static getCompanyProspectById (userId, cb) {

        db.query(`SELECT t1.* , t2.company_name, t3.call_phone
                    FROM users AS t1 INNER JOIN companies AS t2 ON (t1.company_id = t2.company_id) 
                    LEFT JOIN companies_propects AS t3 ON t2.cnpj = t3.cnpj
                    WHERE t1.id=${userId}
                    `, 
                (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, res?.[0]);
                return;
        });
    }

    static updateCompanyProspectStatus (data, cb) {
        
        db.query(`UPDATE users SET status = '${data.status}', company_id='${data.companyId}' WHERE id = '${data.user_id}' `, 
                (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, res);
                return;
        });
    }

    static deleteCompanyProspects(ids, cb) {
        
        db.query(`DELETE FROM companies_propects WHERE user_id IN (${ids})`,  (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
            return;
        })
    }
    
}

module.exports = CompanyProspect;