// src/repositories/task.repository.db.js
const { getDB } = require('../config/db.js');

/**
 * Check if a task title already exists in the MySQL database.
 * @param {string} title
 * @returns {Promise<boolean>}
 */
const existsByTitle = async (title) => {
    const db = getDB();
    const [rows] = await db.execute(
        'SELECT id FROM tasks WHERE title = ?',
        [title]
    );
    return rows.length > 0;
};

module.exports = {
    existsByTitle,
};