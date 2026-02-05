// src/models/task.model.js

class Task{
    constructor({id, title, description, status, priority}){
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }
}
module.exports = Task;