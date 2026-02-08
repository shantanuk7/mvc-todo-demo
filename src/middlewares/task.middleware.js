// src/middlewares/task.middleware.js

const validateUpdateTask = (req, res, next) => {
    const { title, description, status, priority } = req.body;

    if (!title && !description && !status && !priority) {
        return res.status(400).json({
            error: {
                code: "EMPTY_UPDATE_PAYLOAD",
                message: "At least one field must be provided for update"
            }
        });
    }

    if (title !== undefined) {
        if (typeof title !== 'string' || title.length > 100) {
            return res.status(400).json({
                error: {
                    code: "INVALID_TASK_TITLE",
                    message: "Title must be a string with a maximum length of 100 characters"
                }
            });
        }
    }

    if (description !== undefined) {
        if (typeof description !== 'string' || description.length > 500) {
            return res.status(400).json({
                error: {
                    code: "INVALID_TASK_DESCRIPTION",
                    message: "Description must be a string with a maximum length of 500 characters"
                }
            });
        }
    }

    if (status !== undefined) {

        if (typeof status !== 'string' || !['pending', 'in progress', 'completed'].includes(status.toLowerCase())) {
            return res.status(400).json({
                error: {
                    code: "INVALID_TASK_STATUS",
                    message: "Status must be either 'pending', 'in progress', or 'completed' string"
                }
            });
        }

        req.body.status = status.toLowerCase();
    }

    if (priority !== undefined) {
        if (typeof priority !== 'string' || !['low', 'medium', 'high'].includes(priority.toLowerCase())) {
            return res.status(400).json({
                error: {
                    code: "INVALID_TASK_PRIORITY",
                    message: "Priority must be either 'low', 'medium', or 'high'"
                }
            });
        }
        req.body.priority = priority.toLowerCase();
    }

    next();
};

const validateTask = (req, res, next) => {
    let { title, description, status, priority } = req.body;

    if (!title || typeof title !== 'string' || title.length > 100) {
        return res.status(400).json({
            error: {
                code: "INVALID_TASK_TITLE",
                message: "Title is required and must be a string with a maximum length of 100 characters"
            }
        });
    }

    if (!description || typeof description !== 'string' || description.length > 500) {
        return res.status(400).json({
            error: {
                code: "INVALID_TASK_DESCRIPTION",
                message: "Description is required and must be a string with a maximum length of 500 characters"
            }
        });
    }

    if (!status) {
        req.body.status = 'pending';
    } else if (!['pending', 'in progress', 'completed'].includes(status.toLowerCase())) {
        return res.status(400).json({
            error: {
                code: "INVALID_TASK_STATUS",
                message: "Status must be either 'pending', 'in progress', or 'completed'"
            }
        });
    } else {
        req.body.status = status.toLowerCase();
    }

    if (!priority) {
        req.body.priority = 'low';
    } else if (!['low', 'medium', 'high'].includes(priority.toLowerCase())) {
        return res.status(400).json({
            error: {
                code: "INVALID_TASK_PRIORITY",
                message: "Priority must be either 'low', 'medium', or 'high'"
            }
        });
    } else {
        req.body.priority = priority.toLowerCase();
    }
    next();
};

const validateBulkTasks = (req, res, next) => {
    if (!Array.isArray(req.body) || req.body.length === 0) {
        return res.status(400).json({
            error: {
                code: "INVALID_BULK_PAYLOAD",
                message: "Request body must be a non-empty array of tasks"
            }
        });
    }

    const normalizedTasks = [];

    for (let index = 0; index < req.body.length; index += 1) {
        const task = req.body[index];
        if (!task || typeof task !== 'object' || Array.isArray(task)) {
            return res.status(400).json({
                error: {
                    code: "INVALID_TASK_DATA",
                    message: `Task at index ${index} must be an object`
                }
            });
        }

        const { title, description, status, priority } = task;

        if (!title || typeof title !== 'string' || title.length > 100) {
            return res.status(400).json({
                error: {
                    code: "INVALID_TASK_TITLE",
                    message: `Task at index ${index} has an invalid title`
                }
            });
        }

        if (!description || typeof description !== 'string' || description.length > 500) {
            return res.status(400).json({
                error: {
                    code: "INVALID_TASK_DESCRIPTION",
                    message: `Task at index ${index} has an invalid description`
                }
            });
        }

        let normalizedStatus = status;
        if (!normalizedStatus) {
            normalizedStatus = 'pending';
        } else if (typeof normalizedStatus !== 'string' || !['pending', 'in progress', 'completed'].includes(normalizedStatus.toLowerCase())) {
            return res.status(400).json({
                error: {
                    code: "INVALID_TASK_STATUS",
                    message: `Task at index ${index} has an invalid status`
                }
            });
        } else {
            normalizedStatus = normalizedStatus.toLowerCase();
        }

        let normalizedPriority = priority;
        if (!normalizedPriority) {
            normalizedPriority = 'low';
        } else if (typeof normalizedPriority !== 'string' || !['low', 'medium', 'high'].includes(normalizedPriority.toLowerCase())) {
            return res.status(400).json({
                error: {
                    code: "INVALID_TASK_PRIORITY",
                    message: `Task at index ${index} has an invalid priority`
                }
            });
        } else {
            normalizedPriority = normalizedPriority.toLowerCase();
        }

        normalizedTasks.push({
            title,
            description,
            status: normalizedStatus,
            priority: normalizedPriority
        });
    }

    req.body = normalizedTasks;
    next();
};

module.exports = { validateTask, validateUpdateTask, validateBulkTasks };
