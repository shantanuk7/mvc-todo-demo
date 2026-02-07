// src/controllers/task.controller.js

const service = require('../services/task.service.js');

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

const deleteTaskById = async (req, res) => {
    const taskId = req.params.id;
    try {
        const deletedTask = await service.deleteTaskById(taskId);
        res.status(200).send(deletedTask);
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
    getAllTasks,
    updateTask,
    getTaskById,
    deleteTaskById
};