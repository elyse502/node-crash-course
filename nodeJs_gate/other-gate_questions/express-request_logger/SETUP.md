Yes. Using the `performance` API from `node:perf_hooks` is preferable to `Date.now()` when measuring elapsed time because it provides high-resolution timestamps that are independent of system clock changes.

Here is a complete solution.

```js
const express = require("express");
const { performance } = require("node:perf_hooks");

const app = express();
const PORT = 3000;

// Middleware
function requestLogger(req, res, next) {
  const start = performance.now();

  // Called when the response has been completely sent
  res.on("finish", () => {
    const end = performance.now();
    const responseTime = (end - start).toFixed(2);

    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${responseTime}ms`,
    );
  });

  next();
}

// Apply middleware globally
app.use(requestLogger);

// Route: GET /
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the home page",
  });
});

// Route: GET /users
app.get("/users", (req, res) => {
  res.status(200).json({
    users: [
      {
        id: 1,
        name: "Alice",
      },
      {
        id: 2,
        name: "Bob",
      },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

## Example Requests

### GET /

```bash
curl http://localhost:3000
```

Response:

```json
{
  "message": "Welcome to the home page"
}
```

Console output:

```shell
[2026-06-23T14:30:12.713Z] GET / - 3.14ms
```

---

### GET /users

```bash
curl http://localhost:3000/users
```

Response:

```json
{
  "users": [
    {
      "id": 1,
      "name": "Alice"
    },
    {
      "id": 2,
      "name": "Bob"
    }
  ]
}
```

Console output:

```shell
[2026-06-23T14:30:18.091Z] GET /users - 1.87ms
```

## How It Works

### 1. The middleware runs first

```js
app.use(requestLogger);
```

Because it is registered before the routes, every request passes through it.

---

### 2. Record the start time

```js
const start = performance.now();
```

Suppose:

```txt
start = 1024.25 ms
```

---

### 3. Call `next()`

```js
next();
```

This transfers control to the next middleware or route handler.

---

### 4. Wait for the response to finish

```js
res.on("finish", ...)
```

The `"finish"` event fires after Express has flushed the response to the underlying socket.

---

### 5. Compute elapsed time

```js
const responseTime = performance.now() - start;
```

Suppose:

```txt
end = 1029.68 ms
```

Then:

```txt
responseTime = 5.43 ms
```

---

## Why `"finish"` and not before `next()`?

This would be wrong:

```js
function requestLogger(req, res, next) {
  const start = performance.now();

  next();

  console.log(performance.now() - start);
}
```

Because `next()` does not wait for the route handler to complete. The log would happen immediately, before the response is sent.

Using:

```js
res.on("finish", ...)
```

ensures that the measured time includes:

- Route execution
- Database calls
- File operations
- JSON serialization
- Sending the response

which gives the true response time.

## Expected Output Format

```shell
[2025-11-11T18:23:10.000Z] GET /users - 5.43ms
[2025-11-11T18:23:15.000Z] GET / - 1.18ms
```

This approach is similar to how middleware such as Morgan and many production HTTP servers measure request latency internally.
