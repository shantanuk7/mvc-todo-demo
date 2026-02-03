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