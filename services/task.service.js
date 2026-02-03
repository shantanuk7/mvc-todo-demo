const { v4: uuid } = require("uuid");
const Task = require('../models/task.model.js');
const repository = require('../repositories/task.repository.js');

const createTask = async(title, description, status) =>{
    if(repository.taskExistsByTitle(title)){
        throw new Error('Task with this title already exists');
    }
    const task = new Task({
        id:uuid(),
        title,
        description,
        status
    });
    return repository.saveTask(task);
}

module.exports = {
  createTask
};
