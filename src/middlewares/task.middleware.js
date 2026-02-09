// src/middlewares/task.middleware.js

const isValidTitle = (title) => {
    return (
        typeof title === 'string' && 
        title.trim().length > 0 && 
        title.length <= 100
    );
};

const isValidDescription = (desc) => {
    return (
        typeof desc === 'string' && 
        desc.trim().length > 0 && 
        desc.length <= 500
    );
};

const isValidStatus = (status) => {
    if (typeof status !== 'string') return false;
    const validStatuses = ['pending', 'in progress', 'completed'];
    return validStatuses.includes(status.trim().toLowerCase());
};

const isValidPriority = (priority) => {
    if (typeof priority !== 'string') return false;
    const validPriorities = ['low', 'medium', 'high'];
    return validPriorities.includes(priority.trim().toLowerCase());
};

const validateTask = (req, res, next) => {
    const { title, description, status, priority } = req.body;

    if (!isValidTitle(title)) {
        return res.status(400).json({
            error: { code: "INVALID_TASK_TITLE", message: "Title is required (string, 1-100 chars)" }
        });
    }
    if (!isValidDescription(description)) {
        return res.status(400).json({
            error: { code: "INVALID_TASK_DESCRIPTION", message: "Description is required (string, 1-500 chars)" }
        });
    }

    if (status !== undefined && status !== null && !isValidStatus(status)) {
        return res.status(400).json({
            error: { code: "INVALID_TASK_STATUS", message: "Status must be 'pending', 'in progress', or 'completed'" }
        });
    }
    if (priority !== undefined && priority !== null && !isValidPriority(priority)) {
        return res.status(400).json({
            error: { code: "INVALID_TASK_PRIORITY", message: "Priority must be 'low', 'medium', or 'high'" }
        });
    }

    req.body.title = title.trim();
    req.body.description = description.trim();
    req.body.status = (status) ? status.trim().toLowerCase() : 'pending';
    req.body.priority = (priority) ? priority.trim().toLowerCase() : 'low';

    next();
};

const validateUpdateTask = (req, res, next) => {
    const { title, description, status, priority } = req.body;

    if (!title && !description && !status && !priority) {
        return res.status(400).json({
            error: { code: "EMPTY_UPDATE_PAYLOAD", message: "At least one field must be provided for update" }
        });
    }

    if (title !== undefined) {
        if (!isValidTitle(title)) {
            return res.status(400).json({ error: { code: "INVALID_TASK_TITLE", message: "Invalid title format" } });
        }
        req.body.title = title.trim();
    }

    if (description !== undefined) {
        if (!isValidDescription(description)) {
            return res.status(400).json({ error: { code: "INVALID_TASK_DESCRIPTION", message: "Invalid description format" } });
        }
        req.body.description = description.trim();
    }

    if (status !== undefined) {
        if (!isValidStatus(status)) {
            return res.status(400).json({ error: { code: "INVALID_TASK_STATUS", message: "Invalid status value" } });
        }
        req.body.status = status.trim().toLowerCase();
    }

    if (priority !== undefined) {
        if (!isValidPriority(priority)) {
            return res.status(400).json({ error: { code: "INVALID_TASK_PRIORITY", message: "Invalid priority value" } });
        }
        req.body.priority = priority.trim().toLowerCase();
    }

    next();
};

const validateBulkTasks = (req, res, next) => {
    if (!Array.isArray(req.body) || req.body.length === 0) {
        return res.status(400).json({
            error: { code: "INVALID_BULK_PAYLOAD", message: "Request body must be a non-empty array of tasks" }
        });
    }

    const tasks = [];

    for (let i = 0; i < req.body.length; i++) {
        const item = req.body[i];

        if (!item || typeof item !== 'object' || Array.isArray(item)) {
            return res.status(400).json({
                error: { code: "INVALID_TASK_DATA", message: `Task at index ${i} must be an object` }
            });
        }

        if (!isValidTitle(item.title) || !isValidDescription(item.description)) {
            return res.status(400).json({
                error: { code: "INVALID_TASK_DATA", message: `Task at index ${i} has invalid title or description` }
            });
        }

        if (item.status !== undefined && item.status !== null && !isValidStatus(item.status)) {
            return res.status(400).json({ error: { code: "INVALID_TASK_STATUS", message: `Task at index ${i} has invalid status` } });
        }
        if (item.priority !== undefined && item.priority !== null && !isValidPriority(item.priority)) {
            return res.status(400).json({ error: { code: "INVALID_TASK_PRIORITY", message: `Task at index ${i} has invalid priority` } });
        }

        tasks.push({
            title: item.title.trim(),
            description: item.description.trim(),
            status: (item.status) ? item.status.trim().toLowerCase() : 'pending',
            priority: (item.priority) ? item.priority.trim().toLowerCase() : 'low'
        });
    }

    req.body = tasks;
    next();
};

module.exports = { validateTask, validateUpdateTask, validateBulkTasks };
