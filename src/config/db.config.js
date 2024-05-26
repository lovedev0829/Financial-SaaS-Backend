const mysql = require('mysql');
const { logger } = require('../utils/logger');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = require('../utils/secrets');
const {
    migrateAdmin,
  } = require("../service/migrateAdmin");
  
const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    database: DB_NAME
});

connection.connect((err) => {
    if (err) logger.error(err.message);
    else console.log('Database connected')
    return Promise.all([
        migrateAdmin(connection),
    ]);
});

module.exports = connection;