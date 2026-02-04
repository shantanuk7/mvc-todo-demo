const crypto = require('crypto');
const Task = require('../models/task.model.js');
const repository = require('../repositories/task.repository.js');

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
module.exports = {
  createTask,
  getAllTasksService
};
