const tasks = new Map();

const taskExistsByTitle = (title) =>{
    for(let task of tasks.values()){
        if(task.title === title){
            return true;
        }
    }
    return false;
} 

const saveTask = (task) =>{
    tasks.set(task.id,task);
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


module.exports = {
    taskExistsByTitle,
    saveTask,
    findAllTasks
}