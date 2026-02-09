const crypto = require('crypto');
const Task = require('../models/task.model.js');
const repositoryDB = require('../repositories/task.repository.db.js');

/**
 * Create a single task specifically using the Database repository.
 * @param {string} title
 * @param {string} description
 * @param {string} status
 * @param {string} priority
 * @returns {Promise<Task>}
 */
const createTask = async (title, description, status, priority) => {
    const exists = await repositoryDB.existsByTitle(title);
    if (exists) {
        throw new Error('Task with this title already exists in the database');
    }

    const task = new Task({
        id: crypto.randomUUID(),
        title,
        description,
        status,
        priority
    });

    return await repositoryDB.saveTask(task);
};

module.exports = {
    createTask
};