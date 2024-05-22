const { ADMIN_EMAIL, ADMIN_FIRST_NAME, ADMIN_LAST_NAME, ADMIN_PASS } = require("../utils/secrets");
const { currentDateTime } = require("../utils/common")
const { hash: hashPassword } = require('../utils/password');

/**
 * @funtion migrateAdmin
 * @description runs once when the server starts, and insert an admin user if not exist.
 */

const migrateAdmin = (db) => {
 return db.query(`SELECT * FROM users WHERE email = '${ADMIN_EMAIL}'`, (err, res) => {
    if(res[0]) {
      console.log("[Admin] exists already");
      return true;
    } 

    console.log("[Admin] inserting default...");

    db.query(`INSERT INTO users (first_name, last_name, email, password, company_role, role, company_id, status, created_at) VALUES (
        '${ADMIN_FIRST_NAME}', 
        '${ADMIN_LAST_NAME}',
        '${ADMIN_EMAIL}',
        '${hashPassword(ADMIN_PASS)}',
        'admin',
        'admin',
        '0',
        'approved',
        '${currentDateTime()}'
        )`,
      (err, res) => {
            if (err) {
              console.log("Error: Inserting Admin", err);
            }
      });
  })
};



module.exports = {
  migrateAdmin,
};
