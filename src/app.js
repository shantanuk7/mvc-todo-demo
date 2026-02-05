// src/app.js
const express = require("express");
const app = express();
const taskRoutes = require('../routes/task.route.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1/tasks', taskRoutes);
module.exports = app;