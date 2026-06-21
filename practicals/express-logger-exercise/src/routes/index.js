const express = require("express");
const router = express.Router();

/**
 * GET / - Home route
 */
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Express Logger Exercise API",
    endpoints: {
      "/": "Home route",
      "/users": "Get all users",
      "/users/:id": "Get user by ID",
      "/users (POST)": "Create a new user",
      "/users/:id (DELETE)": "Delete a user",
    },
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /health - Health check route
 */
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
