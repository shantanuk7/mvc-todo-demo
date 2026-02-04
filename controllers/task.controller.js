const service = require('../services/task.service.js');

const createTask = async (req,res)=>{
    const {title, description, status, priority} = req.body;
    try {
        const task = await service.createTask(title, description, status, priority);
        res.status(201).send(task);
    } catch (error) {
        res.status(400).json({
            "error":{
                "code": "INVALID_TASK_DATA",
                "message": error.message
            }
        })
    }
}

const getAllTasks = async (req,res)=>{
    try {
        const {status, priority} = req.query;
        const tasks = await service.getAllTasksService(status, priority);
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).json({
            "error":{
                "code": "INTERNAL_SERVER_ERROR",
                "message": error.message
            }
        })
    }
}

module.exports = {
    createTask,
    getAllTasks
};