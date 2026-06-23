This question asks you to build a simple REST API using only Node.js. You need:

- `POST /todo` → create a task.
- `GET /todo` → return all tasks.
- `GET /todo?status=done` → filter tasks by status.
- `GET /todo/:id` → return a task by id.

We'll store tasks in memory with an array.

## Complete Solution

```js
const http = require("node:http");

const tasks = [];
let nextId = 1;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  res.setHeader("Content-Type", "application/json");

  // POST /todo
  if (req.method === "POST" && pathname === "/todo") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const { task, status } = JSON.parse(body);

        if (!task || !["todo", "doing", "done"].includes(status)) {
          res.statusCode = 400;
          return res.end(
            JSON.stringify({
              message: "Invalid task or status",
            }),
          );
        }

        const newTask = {
          id: nextId++,
          task,
          status,
        };

        tasks.push(newTask);

        res.statusCode = 201;
        res.end(JSON.stringify(newTask));
      } catch {
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            message: "Invalid JSON",
          }),
        );
      }
    });
  }

  // GET /todo
  else if (req.method === "GET" && pathname === "/todo") {
    const status = url.searchParams.get("status");

    let result = tasks;

    if (status) {
      result = tasks.filter((task) => task.status === status);
    }

    res.statusCode = 200;
    res.end(JSON.stringify(result));
  }

  // GET /todo/:id
  else if (req.method === "GET" && pathname.startsWith("/todo/")) {
    const id = Number(pathname.split("/")[2]);

    const task = tasks.find((task) => task.id === id);

    if (!task) {
      res.statusCode = 404;
      return res.end(
        JSON.stringify({
          message: "Task not found",
        }),
      );
    }

    res.statusCode = 200;
    res.end(JSON.stringify(task));
  }

  // Route not found
  else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        message: "Not found",
      }),
    );
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

---

## Example 1: Create Tasks

Request:

```bash
curl -X POST http://localhost:3000/todo \
-H "Content-Type: application/json" \
-d '{"task":"Learn Node.js","status":"todo"}'
```

Response:

```json
{
  "id": 1,
  "task": "Learn Node.js",
  "status": "todo"
}
```

---

Another:

```bash
curl -X POST http://localhost:3000/todo \
-H "Content-Type: application/json" \
-d '{"task":"Build API","status":"doing"}'
```

Response:

```json
{
  "id": 2,
  "task": "Build API",
  "status": "doing"
}
```

---

## Example 2: Get All Tasks

Request:

```bash
curl http://localhost:3000/todo
```

Response:

```json
[
  {
    "id": 1,
    "task": "Learn Node.js",
    "status": "todo"
  },
  {
    "id": 2,
    "task": "Build API",
    "status": "doing"
  }
]
```

---

## Example 3: Filter by Status

Request:

```bash
curl "http://localhost:3000/todo?status=doing"
```

Response:

```json
[
  {
    "id": 2,
    "task": "Build API",
    "status": "doing"
  }
]
```

---

## Example 4: Get Task by ID

Request:

```bash
curl http://localhost:3000/todo/1
```

Response:

```json
{
  "id": 1,
  "task": "Learn Node.js",
  "status": "todo"
}
```

---

## Expected Data Shape

```ts
type Task = {
  id: number;
  task: string;
  status: "todo" | "doing" | "done";
};
```

---

## Concepts Being Tested

This exercise tests your understanding of:

1. Creating an HTTP server with `http.createServer()`.
2. Handling different HTTP methods.
3. Reading request bodies using streams (`req.on("data")` and `req.on("end")`).
4. Parsing JSON with `JSON.parse()`.
5. Returning JSON responses.
6. Using query parameters:

```js
url.searchParams.get("status");
```

7. Using route parameters:

```js
pathname.split("/")[2];
```

8. Status codes:

- `200 OK`
- `201 Created`
- `400 Bad Request`
- `404 Not Found`

This is essentially a miniature version of what Express does internally. Once you understand this implementation, Express routing and middleware become much easier to grasp.
