// src/services/task.service.js

const crypto = require('crypto');
const Task = require('../models/task.model.js');
const repository = require('../repositories/task.repository.js');

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

const getAllTasksService = async (status, priority) => {
    return repository.findAllTasks(status, priority);
}

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

const getTaskById = async (taskId) => {
    return repository.findById(taskId);
}

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
