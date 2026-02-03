const validateTask = (req, res, next) => {
    const { title, description, status } = req.body;

    if (!title || typeof title !== 'string' || title.length > 100) {
        return res.status(400).json({
            "error": {
                "code": "INVALID_TASK_TITLE",
                "message": "Title is required and must be a string with a maximum length of 100 characters"
            }
        });
    }

    if (!description || typeof description !== 'string' || description.length > 500) {
        return res.status(400).json({
            "error": {
                "code": "INVALID_TASK_DESCRIPTION",
                "message": "Description is required and must be a string with a maximum length of 500 characters"
            }
        });
    }

    if (!status || !['pending','in progress', 'completed'].includes(status.toLowerCase())) {
        return res.status(400).json({
            "error": {
                "code": "INVALID_TASK_STATUS",
                "message": "Status is required and must be either 'pending', 'in progress', or 'completed'"
            }
        });
    }

    next();
};

module.exports = validateTask;