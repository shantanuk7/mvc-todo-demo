// src/repositories/task.repository.js

const tasks = new Map();

/**
 * Check if a task title already exists.
 * @param {string} title
 * @returns {boolean}
 */
const taskExistsByTitle = (title) => {
    for (let task of tasks.values()) {
        if (task.title === title) {
            return true;
        }
    }
    return false;
}

/**
 * Save a task in memory.
 * @param {import('../models/task.model.js')} task
 * @returns {import('../models/task.model.js')}
 */
const saveTask = (task) => {
    tasks.set(task.id, task);
    return task;
}

/**
 * Return all tasks with optional filters.
 * @param {string} [status]
 * @param {string} [priority]
 * @returns {Array<import('../models/task.model.js')>}
 */
const findAllTasks = (status, priority) => {
    let result = Array.from(tasks.values());
    if (status) {
        result = result.filter(
            task => task.status.toLowerCase() === status.toLowerCase()
        );
    }
    if (priority) {
        result = result.filter(
            task => task.priority.toLowerCase() === priority.toLowerCase()
        );
    }
    return result;
};

/**
 * Update a task by id.
 * @param {string} taskId
 * @param {object} updatedTask
 * @returns {import('../models/task.model.js')}
 */
const updateTaskByID = (taskId, updatedTask) => {
    const task = tasks.get(taskId);
    if (!task) {
        throw new Error("Task not found");
    }
    tasks.set(taskId, { ...task, ...updatedTask });
    return tasks.get(taskId);
}

/**
 * Find a task by id.
 * @param {string} taskId
 * @returns {import('../models/task.model.js')}
 */
const findById = (taskId) => {
    const task = tasks.get(taskId);
    if (!task) {
        throw new Error(`Task with id: ${taskId} not found`)
    }
    return task;
}

/**
 * Delete a task by id.
 * @param {string} taskId
 * @returns {void}
 */
const deleteTaskById = (taskId) => {
    findById(taskId);
    tasks.delete(taskId);
};

module.exports = {
    taskExistsByTitle,
    saveTask,
    findAllTasks,
    updateTaskByID,
    findById,
    deleteTaskById
}