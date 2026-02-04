const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller.js');
const validateTaskMiddleware = require('../middlewares/task.middleware.js');

router.post('/', validateTaskMiddleware, taskController.createTask);
router.get('/', taskController.getAllTasks);
router.patch('/:id', taskController.updateTask);

module.exports = router;