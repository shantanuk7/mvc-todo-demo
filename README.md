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
## Feature (Completed)
### **1. Create Task**
Allows users to create new tasks with validation
- **Endpoint** : POST /v1/tasks 
```json
{
  "title": "string (max 100)",
  "description": "string (max 500)",
  "status": "pending | in progress | completed",
  "priority": "low | medium | high"
}
```
- `createdAt` and `updatedAt` are set automatically during task creation.
- Tasks are created with a default status as pending and priority as low.
- Prevents saving a task if another task with the same title already exists.
- Validates title and description length using middleware.

### **2. List Tasks**
Allows users to get new tasks with or woithout filter
- Returns all tasks when no filters are provided.
- Supports filtering by task status and priority.

**Endpoint**
- GET /v1/tasks
- GET /v1/tasks?status=pending
- GET /v1/tasks?priority=high
- GET /v1/tasks?status=pending&priority=medium



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
### 1. Clone the repository
```code
git clone https://github.com/shantanuk7/mvc-todo-demo.git
cd mvc-todo-demo
```
### 2. Install dependencies:
```bash
npm install
```
### 3. Start server:
```bash
node src/server.js
```
### 4. Server will start at:
```bash
http://localhost:3000
```