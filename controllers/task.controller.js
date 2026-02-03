const service = require('../services/task.service.js');

const createTask = async (req,res)=>{
    const {title, description, status} = req.body;
    try {
        const task = await service.createTask(title, description, status);
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

module.exports = {
    createTask
};