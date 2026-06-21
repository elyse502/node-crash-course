# Node.js HTTP Server Exercise

A simple Node.js HTTP server that handles GET and POST requests for file operations using streams.

## Features

- **GET Request**: Reads and returns contents of `input.txt`
- **POST Request**: Writes request body data to `output.txt`
- **Stream-based file operations** for efficient handling of large files
- **Proper error handling** with appropriate HTTP status codes

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
npm run dev
```

### Testing the Server

#### GET Request

```bash
curl http://localhost:3000
```

Or open in your browser: `http://localhost:3000`

#### POST Request

```bash
curl -X POST -d "Hello World" http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description                | Success Status |
| ------ | -------- | -------------------------- | -------------- |
| GET    | `/`      | Read contents of input.txt | 200            |
| POST   | `/`      | Write data to output.txt   | 201            |

## Error Handling

| Status Code | Description                    |
| ----------- | ------------------------------ |
| 200         | Success (GET)                  |
| 201         | Success (POST)                 |
| 400         | Bad Request (No data provided) |
| 404         | Not Found (input.txt missing)  |
| 405         | Method Not Allowed             |
| 500         | Internal Server Error          |

## Project Structure

```
node-exercise/
├── src/
│   ├── server.js           # Main server file
│   ├── handlers/
│   │   ├── getHandler.js   # GET request handler
│   │   └── postHandler.js  # POST request handler
│   ├── services/
│   │   └── fileService.js  # File operations service
│   └── utils/
│       └── responseUtils.js # HTTP response utilities
├── input.txt               # Input file for GET requests
├── output.txt              # Output file for POST requests
├── package.json
└── README.md
```

## Separation of Concerns

- **Server**: HTTP server setup and routing
- **Handlers**: Request-specific logic (GET/POST)
- **Services**: Business logic (file operations)
- **Utils**: Helper functions (response formatting)

````

---

## Step 10: Testing Your Server

**Commit Message:** `test: add manual testing instructions and examples`

Now test your server:

### Start the server:
```bash
npm start
````

### Test GET request (in another terminal):

```bash
# Should show contents of input.txt
curl http://localhost:3000

# Or in browser, visit: http://localhost:3000
```

### Test POST request:

```bash
# Write data to output.txt
curl -X POST -d "This is my test data" http://localhost:3000

# Should return: "Data successfully written to output.txt"
```

### Test error scenarios:

```bash
# Try POST with no data
curl -X POST http://localhost:3000

# Try a different method
curl -X PUT http://localhost:3000

# Delete input.txt and try GET
rm input.txt
curl http://localhost:3000
```
