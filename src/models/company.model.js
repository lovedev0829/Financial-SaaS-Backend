const db = require('../config/db.config');
const { logger } = require('../utils/logger');
const { currentDateTime } = require("../utils/common")

class Company {
    static getCompanyIdByCNPJ(cnpj, cb) {
        db.query(`SELECT id FROM companies WHERE cnpj = '${cnpj}'`,  (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]?.id);
                return;
            }
            cb(null, 0);
        })
    }

    static getCompanies(cb) {
        db.query('SELECT * FROM companies ORDER BY created_at asc',  (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
            return;
        })
    }

    //delete company
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

    //update company
    static updateCompany (data, cb) {
        
        db.query(`UPDATE companies SET
                    status = '${data.status}',
                    company_code='${data.company_code}',
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

    static updateCompanyRole (data, cb) {
        // set company role when company prospect approve.
        db.query(`UPDATE companies SET  company_role = '${data?.company_role}' WHERE id = ${data?.companyId}`, (err, data) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, data);
            return;
        })
    }

    static createCompany (newCompany, cb) {
        db.query(`INSERT INTO companies (
                    company_code, 
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
                    '${newCompany.company_code}', 
                    '${newCompany.company_nick_name}',
                    '${newCompany.company_name}',
                    '${newCompany.cnpj}',
                    '${newCompany.institution_type}',
                    '${newCompany.company_address}',
                    '${newCompany.business_email}',
                    'active',
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