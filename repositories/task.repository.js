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
module.exports = {
    taskExistsByTitle,
    saveTask
}