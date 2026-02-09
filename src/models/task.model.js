// src/models/task.model.js

/**
 * Task domain model.
 */
class Task{
    /**
     * @param {{id: string, title: string, description: string, status: string, priority: string}} param0
     */
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