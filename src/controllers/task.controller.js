// src/controllers/task.controller.js

const service = require('../services/task.service.db.js');

/**
 * Create a single task.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
const createTask = async (req, res) => {
    const { title, description, status, priority } = req.body;
    try {
        const task = await service.createTask(title, description, status, priority);
        res.status(201).send(task);
    } catch (error) {
        res.status(400).json({
            "error": {
                "code": "INVALID_TASK_DATA",
                "message": error.message
            }
        })
    }
}

/**
 * Create multiple tasks in bulk.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
const createTasks = async (req, res) => {
    try {
        const tasks = await service.createTasks(req.body);
        res.status(201).send(tasks);
    } catch (error) {
        res.status(400).json({
            "error": {
                "code": "INVALID_TASK_DATA",
                "message": error.message
            }
        });
    }
}

/**
 * Fetch all tasks with optional filters.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
const getAllTasks = async (req, res) => {
    try {
        const { status, priority } = req.query;
        const tasks = await service.getAllTasksService(status, priority);
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).json({
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": error.message
            }
        })
    }
}

/**
 * Update a task by id.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, description, status, priority } = req.body;

    try {
        const updatedTask = await service.updateTaskService(taskId, title, description, status, priority);
        res.status(200).send(updatedTask);
    } catch (error) {
        if (error.message === "Task not found") {
            res.status(404).json({
                "error": {
                    "code": "TASK_NOT_FOUND",
                    "message": error.message
                }
            });
        } else {
            res.status(400).json({
                "error": {
                    "code": "INVALID_TASK_DATA",
                    "message": error.message
                }
            });
        }
    }
};

/**
 * Get a task by id.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
const getTaskById = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await service.getTaskById(taskId);
        res.status(200).send(task);
    } catch (error) {
        res.status(404).json({
            "error": {
                "code": "TASK_NOT_FOUND",
                "message": error.message
            }
        });
    }
};

/**
 * Delete a task by id.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
const deleteTaskById = async (req, res) => {
    const taskId = req.params.id;
    try {
        await service.deleteTaskById(taskId);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({
            "error": {
                "code": "TASK_NOT_FOUND",
                "message": error.message
            }
        });
    }
}

module.exports = {
    createTask,
    createTasks,
    getAllTasks,
    updateTask,
    getTaskById,
    deleteTaskById
};