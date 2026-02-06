// src/routes/task.route.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller.js');
const {validateTask, validateUpdateTask} = require('../middlewares/task.middleware.js');

router.post('/', validateTask, taskController.createTask);
router.get('/', taskController.getAllTasks);
router.patch('/:id', validateUpdateTask, taskController.updateTask);
router.get('/:id', taskController.getTaskById);

module.exports = router;