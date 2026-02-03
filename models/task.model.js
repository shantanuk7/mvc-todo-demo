class Task{
    constructor({id, title, description, status, priority}){
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
module.exports = Task;