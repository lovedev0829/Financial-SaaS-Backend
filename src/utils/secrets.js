const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { logger } = require('./logger');

const {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_PORT,
    CLIENT_HOST,
    JWT_SECRET_KEY,
    ADMIN_FIRST_NAME,
    ADMIN_LAST_NAME,
    ADMIN_EMAIL,
    ADMIN_AVATAR,
    ADMIN_PASS
} = process.env;

const requiredCredentials = [
    'DB_HOST',
    'DB_USER',
    'DB_PASS',
    'DB_NAME',
    'DB_PORT',
    'JWT_SECRET_KEY',
    'CLIENT_HOST',
    'JWT_SECRET_KEY',
    'ADMIN_FIRST_NAME',
    'ADMIN_LAST_NAME',
    'ADMIN_EMAIL',
    'ADMIN_PASS'
];

for (const credential of requiredCredentials) {
    if (process.env[credential] === undefined) {
        logger.error(`Missing required crendential: ${credential}`);
        process.exit(1);
    }
}

module.exports = {
   DB_HOST,
   DB_USER,
   DB_PASS,
   DB_NAME,
   DB_PORT,
   CLIENT_HOST,
   JWT_SECRET_KEY,
   ADMIN_EMAIL,
   ADMIN_FIRST_NAME,
   ADMIN_LAST_NAME,
   ADMIN_AVATAR,
   ADMIN_PASS
};
