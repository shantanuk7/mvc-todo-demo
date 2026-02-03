# Todo List Application backend
This is a simple Todo List app backend. The intention of this project is to learn the following concepts:
1. MVC Architecture
2. Basic API implementation
3. Clean coding practices

## Problem Statement and Requirements:

- Design and implement a robust RESTful API for a Task Management System. 
- The application must be built using the Model-View-Controller (MVC) architectural pattern, where the "View" is represented by JSON responses, No Database.
- The primary goal is to demonstrate mastery of Object-Oriented Programming (OOP) and Clean Architecture.

Each task should have:

- A unique identifier (UUID).
- A title (required, max 100 chars).
- A description (required, max 500 chars).
- A status (Pending, In Progress, Completed).
- A priority level (Low, Medium, High).
- Timestamps (Created At, Updated At).

The Backend App must support:

- Create Task: Validate input and prevent duplicate titles.
- List All Tasks: Filterable by status or priority.
- Get Single Task: Retrieve details by ID; handle "Not Found" scenarios gracefully.
- Update Task: Partially update fields (e.g., just changing the status).
- Delete Task: Remove a task and return an appropriate status code.

---
## Feature
### **Create Task**
POST /v1/tasks with validation and duplicate-title check.

**Endpoint** : POST /v1/tasks 

```json
{
  "title": "string (max 100)",
  "description": "string (max 500)",
  "status": "pending | in progress | completed",
  "priority": "optional string"
}
```


## Non Functional Requirements
1. Include URI versioning (/v1/tasks) 
2. Proper Status Codes use:
    a. 201 - create task
    b. 400 Bad Request
    c. 500 Server Error

2. Error Response Format:
```json
{
  "error": {
    "code": "INVALID_TASK_TITLE",
    "message": "Title is required and must be a string with a maximum length of 100 characters"
  }
}
```



## How to run
1. Install dependencies:
```bash
npm install
```
2. Start server:
```bash
node src/server.js
```
