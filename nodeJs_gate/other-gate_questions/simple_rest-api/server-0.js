const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
function requestLogger(req, res, next) {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const end = process.hrtime.bigint();

    // Convert nanoseconds to milliseconds
    const responseTime = Number(end - start) / 1e6;

    const timestamp = new Date().toISOString();

    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} - ${responseTime.toFixed(2)}ms`,
    );
  });

  next();
}

// Apply middleware to all routes
app.use(requestLogger);

// Route: /
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the home page",
  });
});

// Route: /users
app.get("/users", (req, res) => {
  res.json({
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
  console.log(`Server listening on http://localhost:${PORT}`);
});
