const mysql = require('mysql2');
const { logger } = require('../utils/logger');
const { DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_NAME  } = require('../utils/secrets');

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    database: DB_NAME
});

connection.connect((err) => {
    if (err) logger.error(err.message);
});

module.exports = connection;