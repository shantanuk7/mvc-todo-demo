// src/routes/task.route.js

const express = require('express');
/**
 * Task routes.
 */
const router = express.Router();
const taskController = require('../controllers/task.controller.js');
const { validateTask, validateUpdateTask, validateBulkTasks } = require('../middlewares/task.middleware.js');

router.post('/', validateTask, taskController.createTask);
router.post('/bulk', validateBulkTasks, taskController.createTasks);
router.get('/', taskController.getAllTasks);
router.patch('/:id', validateUpdateTask, taskController.updateTask);
router.get('/:id', taskController.getTaskById);
router.delete('/:id', taskController.deleteTaskById);
module.exports = router;