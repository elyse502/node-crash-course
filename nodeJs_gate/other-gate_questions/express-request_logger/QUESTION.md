# Express Middleware

Create an Express.js middleware function called requestLogger that logs the following information for every incoming request:

```text
- HTTP method (e.g., GET, POST)
- URL path
- Timestamp of the request
- Response time (in milliseconds)
```

Then:

1. Integrate this middleware into an Express app.
2. The app should have at least _two routes_ (/ and /users) that return a JSON response.
3. Ensure the middleware runs for _all routes_ and prints logs in the following format:

shell:

> [2025-11-11T18:23:10Z] GET /users - 5ms
