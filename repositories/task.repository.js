const tasks = new Map();

const taskExistsByTitle = (title) =>{
    for(let task of tasks.values()){
        if(task.title === title){
            return true;
        }
    }
    return false;
}
module.exports = {
    taskExistsByTitle,
}