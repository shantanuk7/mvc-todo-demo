const mysql = require("mysql2/promise");

const initDB = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    const dbName = process.env.DB_NAME;

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Successfully created/verified database: ${dbName}`);

    await connection.end();
};

module.exports = { initDB };