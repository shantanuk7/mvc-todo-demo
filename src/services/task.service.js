// src/services/task.service.js

const crypto = require('crypto');
const Task = require('../models/task.model.js');
const repository = require('../repositories/task.repository.js');

/**
 * Create a single task.
 * @param {string} title
 * @param {string} description
 * @param {string} status
 * @param {string} priority
 * @returns {Promise<Task>}
 */
const createTask = async (title, description, status, priority) => {
    if (repository.taskExistsByTitle(title)) {
        throw new Error('Task with this title already exists');
    }
    const task = new Task({
        id: crypto.randomUUID(),
        title,
        description,
        status,
        priority
    });
    return repository.saveTask(task);
}

/**
 * Create multiple tasks.
 * @param {Array<{title: string, description: string, status: string, priority: string}>} tasksData
 * @returns {Promise<Task[]>}
 */
const createTasks = async (tasksData) => {
    const seenTitles = new Set();
    const tasksToSave = tasksData.map((taskData) => {
        const { title, description, status, priority } = taskData;
        if (repository.taskExistsByTitle(title) || seenTitles.has(title)) {
            throw new Error('Task with this title already exists');
        }
        seenTitles.add(title);
        return new Task({
            id: crypto.randomUUID(),
            title,
            description,
            status,
            priority
        });
    });

    return tasksToSave.map((task) => repository.saveTask(task));
}

/**
 * Get all tasks with optional filtering.
 * @param {string} [status]
 * @param {string} [priority]
 * @returns {Promise<Task[]>}
 */
const getAllTasksService = async (status, priority) => {
    return repository.findAllTasks(status, priority);
}

/**
 * Update a task by id with partial fields.
 * @param {string} taskId
 * @param {string|undefined} title
 * @param {string|undefined} description
 * @param {string|undefined} status
 * @param {string|undefined} priority
 * @returns {Promise<Task>}
 */
const updateTaskService = async (taskId, title, description, status, priority) => {
    const updatedTask = {};
    if (title !== undefined) {
        if (repository.taskExistsByTitle(title)) {
            throw new Error('Task with this title already exists');
        }
        updatedTask.title = title
    };
    if (description !== undefined) updatedTask.description = description;
    if (status !== undefined) updatedTask.status = status;
    if (priority !== undefined) updatedTask.priority = priority;

    updatedTask.updatedAt = new Date().toISOString();

    return repository.updateTaskByID(taskId, updatedTask);
};

/**
 * Get a task by id.
 * @param {string} taskId
 * @returns {Promise<Task>}
 */
const getTaskById = async (taskId) => {
    return repository.findById(taskId);
}

/**
 * Delete a task by id.
 * @param {string} taskId
 * @returns {Promise<void>}
 */
const deleteTaskById = async (taskId) => {
    repository.deleteTaskById(taskId);
};

module.exports = {
  createTask,
    createTasks,
  getAllTasksService,
  updateTaskService,
  getTaskById,
  deleteTaskById
};
