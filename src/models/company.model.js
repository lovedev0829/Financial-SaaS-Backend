const db = require('../config/db.config');
const { logger } = require('../utils/logger');
const { currentDateTime } = require("../utils/common")

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

    static getCompanies(cb) {
        db.query('SELECT * FROM companies',  (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
            return;
        })
    }

    static deleteCompany(ids, cb) {
        
        db.query(`DELETE FROM companies WHERE id IN (${ids})`,  (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
            return;
        })
    }

    static updateCompany (data, cb) {
        
        db.query(`UPDATE companies SET
                    status = '${data.status}',
                    company_id='${data.company_id}',
                    company_nick_name='${data.company_nick_name}',
                    company_name='${data.company_name}',
                    cnpj='${data.cnpj}',
                    institution_type='${data.institution_type}',
                    company_address='${data.company_address}',
                    business_email='${data.business_email}',
                    cetip_account_num='${data.cetip_account_num}'
                    WHERE id = '${data.id}'`,

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

    static createCompany (newCompany, cb) {
        db.query(`INSERT INTO companies (
                    company_id, 
                    company_nick_name, 
                    company_name, 
                    cnpj, 
                    institution_type, 
                    company_address, 
                    business_email, 
                    status, 
                    cetip_account_num, 
                    created_at
                ) VALUES (
                    '${newCompany.company_id}', 
                    '${newCompany.company_nick_name}',
                    '${newCompany.company_name}',
                    '${newCompany.cnpj}',
                    '${newCompany.institution_type}',
                    '${newCompany.company_address}',
                    '${newCompany.business_email}',
                    '${newCompany.status}',
                    '${newCompany.cetip_account_num}',
                    '${currentDateTime()}'
                )`,

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
}

module.exports = Company;