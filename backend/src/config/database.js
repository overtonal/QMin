require('dotenv').config();

const { Pool } = require('pg');

const dbPool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'qmin_db'
});

dbPool.on('error', (err) => {
    console.warn('Database connection error:', err.message);
});

module.exports = dbPool;
