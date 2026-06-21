const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/taskController");
const ValidationMiddleware = require("../middleware/validation");

/**
 * Task Routes
 * All routes are prefixed with /todo
 */

// GET /todo - Get all tasks (with optional status filter)
router.get("/", TaskController.getAllTasks);

// GET /todo/stats - Get task statistics
router.get("/stats", TaskController.getStats);

// GET /todo/:id - Get task by ID
router.get(
  "/:id",
  ValidationMiddleware.validateTaskId,
  TaskController.getTaskById,
);

// POST /todo - Create a new task
router.post(
  "/",
  ValidationMiddleware.validateCreateTask,
  TaskController.createTask,
);

// POST /todo/bulk - Bulk create tasks
router.post(
  "/bulk",
  ValidationMiddleware.validateBulkCreate,
  TaskController.bulkCreate,
);

// PUT /todo/:id - Update a task
router.put(
  "/:id",
  ValidationMiddleware.validateTaskId,
  ValidationMiddleware.validateUpdateTask,
  TaskController.updateTask,
);

// PATCH /todo/:id/status - Update task status
router.patch(
  "/:id/status",
  ValidationMiddleware.validateTaskId,
  TaskController.updateTaskStatus,
);

// DELETE /todo/:id - Delete a task
router.delete(
  "/:id",
  ValidationMiddleware.validateTaskId,
  TaskController.deleteTask,
);

module.exports = router;
