// src/services/task.service.js

const crypto = require('crypto');
const Task = require('../../models/task.model.js');
const repository = require('../../repositories/task.repository.js');

const createTask = async(title, description, status, priority) =>{
    
    if(repository.taskExistsByTitle(title)){
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

const getAllTasksService = async (status, priority) =>{
    return repository.findAllTasks(status, priority);
}

const updateTaskService = async (taskId, title, description, status, priority) => {
    const updatedTask = {};

    if (title !== undefined){
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

module.exports = {
  createTask,
  getAllTasksService,
  updateTaskService
};
