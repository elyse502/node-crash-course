const express = require("express");
const router = express.Router();

// Mock user data
let users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Carol Davis", email: "carol@example.com" },
];

/**
 * GET /users - Get all users
 */
router.get("/", (req, res) => {
  res.json({
    success: true,
    count: users.length,
    data: users,
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /users/:id - Get user by ID
 */
router.get("/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: `User with ID ${id} not found`,
    });
  }

  res.json({
    success: true,
    data: user,
    timestamp: new Date().toISOString(),
  });
});

/**
 * POST /users - Create a new user
 */
router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: "Name and email are required",
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser,
    message: "User created successfully",
  });
});

/**
 * DELETE /users/:id - Delete a user
 */
router.delete("/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: `User with ID ${id} not found`,
    });
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  res.json({
    success: true,
    data: deletedUser,
    message: "User deleted successfully",
  });
});

module.exports = router;
