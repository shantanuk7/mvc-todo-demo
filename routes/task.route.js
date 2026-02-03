const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller.js');
const validateTaskMiddleware = require('../middlewares/task.middleware.js');
router.post('/', validateTaskMiddleware, taskController.createTask);

module.exports = router;