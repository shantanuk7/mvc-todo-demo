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

module.exports = validateTask;
