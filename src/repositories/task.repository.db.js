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
/**
 * Saves a new task to the MySQL database.
 * @param {Object} task - The task object to save
 * @param {string} task.id - The unique identifier for the task
 * @param {string} task.title - The title of the task
 * @param {string} task.description - The description of the task
 * @param {string} task.status - The status of the task (e.g., 'pending', 'completed')
 * @param {string} task.priority - The priority level of the task (e.g., 'low', 'medium', 'high')
 * @param {Date} task.createdAt - The timestamp when the task was created
 * @param {Date} task.updatedAt - The timestamp when the task was last updated
 * @returns {Promise<Object>} The saved task object
 */
const saveTask = async (task) => {
    const db = getDB();
    await db.execute(
        'INSERT INTO tasks (id, title, description, status, priority, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
            task.id,
            task.title,
            task.description,
            task.status,
            task.priority,
            task.createdAt,
            task.updatedAt
        ]
    );
    return task;
};

module.exports = {
    existsByTitle,
    saveTask
};