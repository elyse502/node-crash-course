# 📋 Todo API

A simple, well-structured RESTful API for managing todo tasks built with Express.js and JavaScript. This API provides complete CRUD operations with proper separation of concerns.

## ✨ Features

- **Complete CRUD Operations**: Create, Read, Update, and Delete tasks
- **Status Management**: Track tasks with `todo`, `doing`, or `done` status
- **Filter by Status**: Query tasks by their current status
- **Bulk Operations**: Create multiple tasks at once
- **Task Statistics**: Get overview statistics about your tasks
- **Validation**: Input validation for all operations
- **Error Handling**: Comprehensive error handling with appropriate status codes
- **Clean Architecture**: Separation of concerns with MVC-like structure
- **In-Memory Database**: Simple data storage for learning purposes

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/todo-api.git

# Navigate to the project directory
cd todo-api

# Install dependencies
npm install

# Start the server
npm start

# Or for development with auto-restart
npm run dev
```

The server will start at `http://localhost:3000`

## 📊 API Endpoints

### Base URL

```
http://localhost:3000
```

### Task Endpoints

| Method     | Endpoint           | Description         | Query Params                | Request Body         |
| ---------- | ------------------ | ------------------- | --------------------------- | -------------------- |
| **GET**    | `/todo`            | Get all tasks       | `?status=todo\|doing\|done` | -                    |
| **GET**    | `/todo/:id`        | Get task by ID      | -                           | -                    |
| **GET**    | `/todo/stats`      | Get task statistics | -                           | -                    |
| **POST**   | `/todo`            | Create a new task   | -                           | `{ task, status? }`  |
| **POST**   | `/todo/bulk`       | Bulk create tasks   | -                           | `{ tasks: [...] }`   |
| **PUT**    | `/todo/:id`        | Update a task       | -                           | `{ task?, status? }` |
| **PATCH**  | `/todo/:id/status` | Update task status  | -                           | `{ status }`         |
| **DELETE** | `/todo/:id`        | Delete a task       | -                           | -                    |

## 📝 Task Structure

```json
{
  "id": 1,
  "task": "Learn Node.js fundamentals",
  "status": "doing"
}
```

### Status Values

- `todo` - Task is planned but not started
- `doing` - Task is currently in progress
- `done` - Task is completed

## 📚 API Usage Examples

### 1. Get All Tasks

```bash
# Get all tasks
curl http://localhost:3000/todo

# Filter by status
curl http://localhost:3000/todo?status=doing
```

**Response:**

```json
{
  "success": true,
  "message": "Success",
  "timestamp": "2025-11-11T18:23:10Z",
  "data": {
    "tasks": [
      {
        "id": 1,
        "task": "Learn Node.js fundamentals",
        "status": "doing"
      },
      {
        "id": 2,
        "task": "Build a REST API",
        "status": "todo"
      }
    ],
    "stats": {
      "total": 3,
      "todo": 1,
      "doing": 1,
      "done": 1,
      "completionRate": 33
    },
    "count": 2,
    "filter": "doing"
  }
}
```

### 2. Get Task by ID

```bash
curl http://localhost:3000/todo/1
```

**Response:**

```json
{
  "success": true,
  "message": "Success",
  "timestamp": "2025-11-11T18:23:10Z",
  "data": {
    "id": 1,
    "task": "Learn Node.js fundamentals",
    "status": "doing"
  }
}
```

### 3. Create a New Task

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"task": "Write comprehensive API documentation"}' \
  http://localhost:3000/todo
```

**With custom status:**

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"task": "Review pull requests", "status": "doing"}' \
  http://localhost:3000/todo
```

**Response:**

```json
{
  "success": true,
  "message": "Resource created successfully",
  "timestamp": "2025-11-11T18:23:15Z",
  "data": {
    "id": 4,
    "task": "Write comprehensive API documentation",
    "status": "todo"
  }
}
```

### 4. Bulk Create Tasks

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "tasks": [
      {"task": "Setup project structure"},
      {"task": "Implement CRUD operations", "status": "doing"},
      {"task": "Write unit tests", "status": "todo"}
    ]
  }' \
  http://localhost:3000/todo/bulk
```

### 5. Update a Task

```bash
# Update task description
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{"task": "Learn advanced Node.js concepts"}' \
  http://localhost:3000/todo/1

# Update status only
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{"status": "done"}' \
  http://localhost:3000/todo/1

# Update both
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{"task": "Complete Node.js project", "status": "done"}' \
  http://localhost:3000/todo/1
```

**Response:**

```json
{
  "success": true,
  "message": "Success",
  "timestamp": "2025-11-11T18:23:20Z",
  "data": {
    "id": 1,
    "task": "Learn advanced Node.js concepts",
    "status": "done"
  }
}
```

### 6. Update Task Status (Quick Update)

```bash
curl -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"status": "done"}' \
  http://localhost:3000/todo/2/status
```

**Response:**

```json
{
  "success": true,
  "message": "Success",
  "timestamp": "2025-11-11T18:23:25Z",
  "data": {
    "id": 2,
    "task": "Build a REST API",
    "status": "done"
  }
}
```

### 7. Delete a Task

```bash
curl -X DELETE http://localhost:3000/todo/3
```

**Response:**

```json
{
  "success": true,
  "message": "Task deleted successfully",
  "timestamp": "2025-11-11T18:23:30Z",
  "data": {
    "id": 3
  }
}
```

### 8. Get Task Statistics

```bash
curl http://localhost:3000/todo/stats
```

**Response:**

```json
{
  "success": true,
  "message": "Success",
  "timestamp": "2025-11-11T18:23:35Z",
  "data": {
    "total": 5,
    "todo": 2,
    "doing": 1,
    "done": 2,
    "completionRate": 40
  }
}
```

## 🔧 Response Structure

### Success Response

```json
{
  "success": true,
  "message": "Success message",
  "timestamp": "ISO timestamp",
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "ISO timestamp",
  "errors": [
    // Validation errors (if any)
  ]
}
```

## 📁 Project Structure

```
todo-api/
├── src/
│   ├── server.js                 # Main server file
│   ├── config/
│   │   └── database.js           # In-memory database
│   ├── models/
│   │   └── Task.js              # Task model with validation
│   ├── services/
│   │   └── taskService.js       # Business logic
│   ├── controllers/
│   │   └── taskController.js    # Request handlers
│   ├── routes/
│   │   └── taskRoutes.js        # Route definitions
│   ├── middleware/
│   │   ├── errorHandler.js      # Global error handling
│   │   └── validation.js        # Request validation
│   └── utils/
│       └── responseUtils.js     # Standardized responses
├── package.json
├── .gitignore
└── README.md
```

## 🧪 Testing with Postman

### Import Collection

Create a new collection in Postman and add these requests:

#### Variables

```
baseUrl: http://localhost:3000
taskId: 1
```

#### Requests

1. **GET All Tasks**
   - Method: GET
   - URL: `{{baseUrl}}/todo`

2. **GET Tasks by Status**
   - Method: GET
   - URL: `{{baseUrl}}/todo?status=doing`

3. **GET Task by ID**
   - Method: GET
   - URL: `{{baseUrl}}/todo/{{taskId}}`

4. **POST Create Task**
   - Method: POST
   - URL: `{{baseUrl}}/todo`
   - Body: JSON

   ```json
   {
     "task": "New task",
     "status": "todo"
   }
   ```

5. **PUT Update Task**
   - Method: PUT
   - URL: `{{baseUrl}}/todo/{{taskId}}`
   - Body: JSON

   ```json
   {
     "task": "Updated task",
     "status": "done"
   }
   ```

6. **PATCH Update Status**
   - Method: PATCH
   - URL: `{{baseUrl}}/todo/{{taskId}}/status`
   - Body: JSON

   ```json
   {
     "status": "done"
   }
   ```

7. **DELETE Task**
   - Method: DELETE
   - URL: `{{baseUrl}}/todo/{{taskId}}`

## 📦 Dependencies

### Production Dependencies

- **express**: ^4.18.2 - Fast, unopinionated web framework
- **uuid**: ^9.0.0 - For generating unique IDs

### Development Dependencies

- **nodemon**: ^3.0.1 - Auto-restart server during development

## 🛠️ Development

### Run in Development Mode

```bash
npm run dev
```

### Run in Production Mode

```bash
npm start
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

## 🔒 Error Handling

The API handles various error scenarios:

| Status Code | Description                                        |
| ----------- | -------------------------------------------------- |
| **200**     | Success (GET, PUT, PATCH, DELETE)                  |
| **201**     | Created (POST)                                     |
| **207**     | Multi-Status (Partial success for bulk operations) |
| **400**     | Bad Request (Validation errors)                    |
| **404**     | Not Found (Resource doesn't exist)                 |
| **405**     | Method Not Allowed                                 |
| **500**     | Internal Server Error                              |

### Common Error Responses

**Task Not Found:**

```json
{
  "success": false,
  "error": "Task with ID 99 not found",
  "timestamp": "2025-11-11T18:23:40Z"
}
```

**Validation Error:**

```json
{
  "success": false,
  "error": "Validation errors",
  "timestamp": "2025-11-11T18:23:45Z",
  "errors": [
    "Task description is required",
    "Status must be one of: todo, doing, done"
  ]
}
```

**Invalid Status:**

```json
{
  "success": false,
  "error": "Invalid status. Must be one of: todo, doing, done",
  "timestamp": "2025-11-11T18:23:50Z"
}
```

## 🎯 Learning Outcomes

This project demonstrates:

1. **Separation of Concerns**: Clear separation between routes, controllers, services, and models
2. **Middleware Usage**: Custom validation and error handling middleware
3. **RESTful Design**: Proper HTTP methods and status codes
4. **Data Validation**: Input validation at multiple levels
5. **Error Handling**: Comprehensive error handling with meaningful messages
6. **Modular Architecture**: Reusable and maintainable code structure
7. **API Design**: Clean and consistent API responses

## 🚦 Roadmap

- [ ] Add persistent storage (MongoDB/PostgreSQL)
- [ ] User authentication and authorization
- [ ] Task due dates and priorities
- [ ] Task categories/tags
- [ ] Search functionality
- [ ] Pagination and sorting
- [ ] API versioning
- [ ] Swagger/OpenAPI documentation
- [ ] Unit and integration tests
- [ ] Docker containerization

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

### **Elysée NIYIBIZI**

_Junior Fullstack Software Engineer_

<div align="center">

[![Portfolio](https://img.shields.io/badge/Portfolio-elyseedev.netlify.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://elyseedev.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-elyse502-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/elyse502)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Niyibizi_Elysée-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/niyibizi-elysée)
[![Email](https://img.shields.io/badge/Email-elyseniyibizi502@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:elyseniyibizi502@gmail.com)

</div>

## 🙏 Acknowledgments

- Express.js for the amazing framework
- The Node.js community for the excellent ecosystem

---

## 📞 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/node-crash-course/issues) or contact the author.

---

<p align="center"><b>Made with ❤️ for learning and teaching purposes</b></p>
