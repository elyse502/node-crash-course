# Express Logger Middleware Exercise

An Express.js application with a custom request logger middleware that logs HTTP method, URL, timestamp, and response time.

## Features

- **Custom Logger Middleware**: Logs every incoming request with:
  - HTTP method (GET, POST, etc.)
  - URL path
  - ISO timestamp
  - Response time in milliseconds
- **Multiple Routes**: `/` and `/users` endpoints
- **JSON Responses**: All routes return JSON
- **Error Handling**: Comprehensive error handling with proper status codes
- **Color-coded Logs**: Easy to read console output

## Installation

```bash
npm install
```

## Usage

### Start the Server

```bash
npm start
```

For development with auto-restart:

```bash
npm run server
```

### Log Format

```
[2025-11-11T18:23:10Z] GET /users - 5ms
```

### Testing the API

#### Home Route

```bash
curl http://localhost:3000
```

#### Get All Users

```bash
curl http://localhost:3000/users
```

#### Get User by ID

```bash
curl http://localhost:3000/users/1
```

#### Create New User

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"David Lee","email":"david@example.com"}' \
  http://localhost:3000/users
```

#### Delete User

```bash
curl -X DELETE http://localhost:3000/users/1
```

## API Endpoints

| Method | Endpoint     | Description              | Response     |
| ------ | ------------ | ------------------------ | ------------ |
| GET    | `/`          | Home route with API info | 200 JSON     |
| GET    | `/users`     | Get all users            | 200 JSON     |
| GET    | `/users/:id` | Get user by ID           | 200/404 JSON |
| POST   | `/users`     | Create new user          | 201/400 JSON |
| DELETE | `/users/:id` | Delete user              | 200/404 JSON |
| GET    | `/health`    | Health check             | 200 JSON     |

## Project Structure

```
express-logger-exercise/
├── src/
│   ├── server.js              # Main server file
│   ├── middleware/
│   │   ├── requestLogger.js   # Logger middleware
│   │   └── loggerConfig.js    # Logger configuration
│   ├── routes/
│   │   ├── index.js           # Home routes
│   │   └── users.js           # Users routes
│   └── utils/
│       └── logger.js          # Logger utility
├── package.json
└── README.md
```

## Middleware Implementation Details

### Request Logger Middleware

The `requestLogger.js` middleware:

1. **Captures start time** when the request is received
2. **Overrides response methods** (`end`, `json`, `send`) to intercept when the response is sent
3. **Calculates response time** in milliseconds
4. **Logs the request** in the specified format
5. **Handles edge cases** like errors and multiple response method calls

### How It Works

```javascript
// When a request comes in:
[2025-11-11T18:23:10Z] GET /users - 5ms

// The middleware calculates:
// - Method: GET
// - URL: /users
// - Timestamp: 2025-11-11T18:23:10Z
// - Response Time: 5ms
```

## Log Levels

| Response Time | Color           | Meaning         |
| ------------- | --------------- | --------------- |
| < 100ms       | Green (Success) | Fast response   |
| 100-500ms     | Cyan (Info)     | Normal response |
| > 500ms       | Yellow (Warn)   | Slow response   |
| Error         | Red (Error)     | Request failed  |

## Testing with Different Scenarios

### Test Fast Response

```bash
curl http://localhost:3000/health
# Log: [timestamp] GET /health - 2ms (green)
```

### Test Slow Response (with delay)

Add to a route:

```javascript
router.get("/slow", (req, res) => {
  setTimeout(() => {
    res.json({ message: "Slow response" });
  }, 1000);
});
```

### Test Error Response

```bash
curl http://localhost:3000/users/999
# Log: [timestamp] GET /users/999 - 3ms (green) even though 404
```

## Configuration Options

You can customize the logger by modifying `src/middleware/loggerConfig.js`:

```javascript
const customLogger = loggerConfig.createMiddleware({
  logBody: true, // Log request body
  logHeaders: true, // Log request headers
  logQuery: true, // Log query parameters
  timeFormat: "locale", // Use locale time format
});
```

## Comparison with Morgan

This custom logger provides:

- **More control** over logging format
- **Response time tracking** similar to Morgan
- **Color-coded output** for better readability
- **Flexible configuration** options
- **No external dependencies** (unlike Morgan)

## Visual Console Output

```
📥 Incoming: GET /users
[2025-11-11T18:23:10Z] GET /users - 5ms
📥 Incoming: POST /users
[2025-11-11T18:23:15Z] POST /users - 12ms
📥 Incoming: DELETE /users/1
[2025-11-11T18:23:20Z] DELETE /users/1 - 3ms
```

---

**Note**: This is a learning exercise demonstrating middleware concepts. For production, consider using Morgan with custom formats.

````

---

## Step 10: Testing with Example Commands

**Commit Message:** `test: add comprehensive test commands for all routes`

Create a test file `test-api.sh` (optional):
```bash
#!/bin/bash

echo "🧪 Testing Express Logger API"
echo "=============================="
echo ""

# Test 1: Home route
echo "1️⃣ Testing GET /"
curl -s http://localhost:3000 | jq '.'
echo ""
echo ""

# Test 2: Get all users
echo "2️⃣ Testing GET /users"
curl -s http://localhost:3000/users | jq '.'
echo ""
echo ""

# Test 3: Get user by ID
echo "3️⃣ Testing GET /users/1"
curl -s http://localhost:3000/users/1 | jq '.'
echo ""
echo ""

# Test 4: Create new user
echo "4️⃣ Testing POST /users"
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Eva Martinez","email":"eva@example.com"}' \
  http://localhost:3000/users | jq '.'
echo ""
echo ""

# Test 5: Delete user
echo "5️⃣ Testing DELETE /users/2"
curl -s -X DELETE http://localhost:3000/users/2 | jq '.'
echo ""
echo ""

# Test 6: Health check
echo "6️⃣ Testing GET /health"
curl -s http://localhost:3000/health | jq '.'
echo ""
echo ""

# Test 7: 404 route
echo "7️⃣ Testing 404 Not Found"
curl -s -w "\nStatus: %{http_code}\n" http://localhost:3000/nonexistent
echo ""

echo "✅ All tests completed!"
````

Make it executable:

```bash
chmod +x test-api.sh
```

---

## Complete Git Commands

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit with conventional message
git commit -m "feat: complete express request logger middleware exercise

- Implement custom request logger middleware with response time tracking
- Add home and users routes with full CRUD operations
- Create logger utility with color-coded console output
- Include comprehensive error handling
- Add configuration support for logger customization
- Provide test commands and documentation"

# Add remote repository
git remote add origin https://github.com/yourusername/express-logger-exercise.git

# Push to GitHub
git push -u origin main
```
