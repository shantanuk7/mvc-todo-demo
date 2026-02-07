// src/repositories/task.repository.js

const tasks = new Map();

const taskExistsByTitle = (title) => {
    for (let task of tasks.values()) {
        if (task.title === title) {
            return true;
        }
    }
    return false;
}

const saveTask = (task) => {
    tasks.set(task.id, task);
    return task;
}

const findAllTasks = (status, priority) => {
    let result = Array.from(tasks.values());
    if (status) {
        result = result.filter(
            task => task.status.toLowerCase() === status.toLowerCase()
        );
    }
    if (priority) {
        result = result.filter(
            task => task.priority.toLowerCase() === priority.toLowerCase()
        );
    }
    return result;
};

const updateTaskByID = (taskId, updatedTask) => {
    const task = tasks.get(taskId);
    if (!task) {
        throw new Error("Task not found");
    }
    tasks.set(taskId, { ...task, ...updatedTask });
    return tasks.get(taskId);
}

const findById = (taskId) => {
    const task = tasks.get(taskId);
    if (!task) {
        throw new Error(`Task with id: ${taskId} not found`)
    }
    return task;
}

const deleteTaskById = (taskId) => {
    const task = findById(taskId);
    tasks.delete(taskId);
};

module.exports = {
    taskExistsByTitle,
    saveTask,
    findAllTasks,
    updateTaskByID,
    findById,
    deleteTaskById
}