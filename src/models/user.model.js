const db = require('../config/db.config');
const { logger } = require('../utils/logger');

class User {
     static create(newUser, cb) {
        
        db.query(`INSERT INTO users (first_name, last_name, email, company_role, role, company_id, status, created_at) VALUES (
                '${newUser.firstName}', 
                '${newUser.lastName}',
                '${newUser.email}',
                '${newUser.companyRole}',
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
        db.query("SELECT * FROM users WHERE email = ? ", email,  (err, res) => {
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

    static getUserData(userId, cb){
        db.query(`SELECT * FROM users WHERE id = '${userId}'`,  (err, res) => {
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
}

module.exports = User;