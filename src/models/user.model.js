const db = require('../config/db.config');
const { currentDateTime } = require('../utils/common');
const { logger } = require('../utils/logger');

class User {
     static create(newUser, cb) {
        
        db.query(`INSERT INTO users (first_name, last_name, email, role, company_id, status, created_at) VALUES (
                '${newUser.firstName}',
                '${newUser.lastName}',
                '${newUser.email}',
                '${newUser.role}',
                '${newUser.company_id}',
                '${newUser.status}',
                '${newUser.created_at}'
            )`,
          (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    userId: res.insertId,
                    email: newUser.email
                });
        });
    }

    static findByEmail(email, cb) {
        db.query(`SELECT t1.*, t2.call_phone, t2.company FROM users as t1 
                    LEFT JOIN companies_propects AS t2 ON t1.id = t2.user_id 
                    WHERE t1.email = '${email}' `,  
            (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static findEmployeeByEmail(data, cb) {
        let newQuery = "";
        if(data?.id){
            newQuery = `and id!=${data?.id}`;
        }
        db.query(`SELECT * FROM users WHERE email = '${data?.email}' ${newQuery}`,  (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res[0]);
            return;
        })
    }

    static findUserByID(userId, cb) {
        db.query(`SELECT * FROM users WHERE id = '${userId}'`,  (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res[0]);
            return;
        })
    }

    static getUserData(userId, cb){
        db.query(`SELECT t1.*, t2.company_role FROM users AS t1 LEFT JOIN companies_propects AS t2 ON t1.id = t2.user_id WHERE t1.id = '${userId}'`,  (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
    
    static confirmUserRegistration (data, cb) {
        
        db.query(`UPDATE users SET 
                        password='${data.haspwd}'
                        WHERE id = '${data.userId}' `, 
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

    static getCompanyEmployees(company_id, cb){
        db.query(`SELECT * FROM users WHERE company_id = '${company_id}' and role!='master' ORDER BY created_at DESC`,  (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
            return;
        })
    }

    static deleteEmployee(ids, cb) {
        
        db.query(`DELETE FROM users WHERE id IN (${ids})`,  (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
            return;
        })
    }

    static createEmployee(newEmployee, cb){
            db.query(`INSERT INTO users (first_name, last_name, avatar, email, role, company_id, status, created_at) VALUES (
                '${newEmployee.firstName}', 
                '${newEmployee.lastName}',
                '${newEmployee.avatar}', 
                '${newEmployee.email}',
                '${newEmployee.role}',
                '${newEmployee.company_id}',
                'enabled',
                '${currentDateTime()}'
            )`,
        (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    userId: res.insertId,
                    email: newEmployee.email
                });
        });
    }

    static updateEmployee(data, cb){
        
        let newQuery = "";
        
        if(data?.avatar !="") {
            newQuery = ` avatar='${data?.avatar}', `;
        }

        db.query(`UPDATE users SET
                ${newQuery}
                first_name ='${data.firstName}',
                last_name ='${data.lastName}',
                email ='${data.email}',
                role ='${data.role}',
                status ='${data.status}'
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
}

module.exports = User;