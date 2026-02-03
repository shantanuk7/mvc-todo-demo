const express = require('express');
const router = express();
const taskController = require('../controllers/task.controller.js');

router.post('/', taskController.createTask);

module.exports = router;