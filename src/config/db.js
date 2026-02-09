const mysql = require("mysql2/promise");

let pool;

const initDB = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    const dbName = process.env.DB_NAME;
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.end();
    console.log(`Database '${dbName}' is ready.`);
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: dbName,
    });

    const tableQuery = `
        CREATE TABLE IF NOT EXISTS tasks (
            id VARCHAR(255) PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            description VARCHAR(500),
            status ENUM('pending', 'in progress', 'completed') DEFAULT 'pending',
            priority ENUM('low', 'medium', 'high') DEFAULT 'low',
            createdAt VARCHAR(255),
            updatedAt VARCHAR(255)
        );
    `;
    await pool.execute(tableQuery);
    console.log('Tasks table is ready.');
};

const getDB = () => {
    if (!pool) {
        throw new Error("Database not initialized. Call initDB first.");
    }
    return pool;
};

module.exports = { initDB, getDB };