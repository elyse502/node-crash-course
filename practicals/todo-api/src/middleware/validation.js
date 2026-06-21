const Task = require("../models/Task");
const ResponseUtils = require("../utils/responseUtils");

/**
 * Validation Middleware
 * Validates request data before reaching controllers
 */
class ValidationMiddleware {
  /**
   * Validate task creation data
   */
  static validateCreateTask(req, res, next) {
    const { task, status } = req.body;

    // Check if task is provided
    if (!task) {
      return ResponseUtils.badRequest(res, "Task description is required");
    }

    // Check if task is valid
    if (task.trim() === "") {
      return ResponseUtils.badRequest(res, "Task description cannot be empty");
    }

    // Check task length
    if (task.length < 3) {
      return ResponseUtils.badRequest(
        res,
        "Task description must be at least 3 characters",
      );
    }

    if (task.length > 200) {
      return ResponseUtils.badRequest(
        res,
        "Task description must be less than 200 characters",
      );
    }

    // Validate status if provided
    if (status && !Task.VALID_STATUSES.includes(status)) {
      return ResponseUtils.badRequest(
        res,
        `Invalid status. Must be one of: ${Task.VALID_STATUSES.join(", ")}`,
      );
    }

    // Trim task and continue
    req.body.task = task.trim();
    next();
  }

  /**
   * Validate task update data
   */
  static validateUpdateTask(req, res, next) {
    const { task, status } = req.body;

    // Validate task if provided
    if (task !== undefined) {
      if (task.trim() === "") {
        return ResponseUtils.badRequest(
          res,
          "Task description cannot be empty",
        );
      }
      if (task.length < 3) {
        return ResponseUtils.badRequest(
          res,
          "Task description must be at least 3 characters",
        );
      }
      if (task.length > 200) {
        return ResponseUtils.badRequest(
          res,
          "Task description must be less than 200 characters",
        );
      }
      req.body.task = task.trim();
    }

    // Validate status if provided
    if (status !== undefined) {
      if (!Task.VALID_STATUSES.includes(status)) {
        return ResponseUtils.badRequest(
          res,
          `Invalid status. Must be one of: ${Task.VALID_STATUSES.join(", ")}`,
        );
      }
    }

    next();
  }

  /**
   * Validate task ID parameter
   */
  static validateTaskId(req, res, next) {
    const id = Number.parseInt(req.params.id);

    if (Number.isNaN(id) || id < 1) {
      return ResponseUtils.badRequest(
        res,
        "Invalid task ID. Must be a positive number",
      );
    }

    req.params.id = id;
    next();
  }

  /**
   * Validate bulk create data
   */
  static validateBulkCreate(req, res, next) {
    const { tasks } = req.body;

    if (!tasks) {
      return ResponseUtils.badRequest(res, "Tasks array is required");
    }

    if (!Array.isArray(tasks)) {
      return ResponseUtils.badRequest(res, "Tasks must be an array");
    }

    if (tasks.length === 0) {
      return ResponseUtils.badRequest(res, "Tasks array cannot be empty");
    }

    if (tasks.length > 100) {
      return ResponseUtils.badRequest(
        res,
        "Cannot create more than 100 tasks at once",
      );
    }

    // Validate each task
    const errors = [];
    tasks.forEach((task, index) => {
      if (!task.task || task.task.trim() === "") {
        errors.push(`Task at index ${index} is missing description`);
      }
      if (task.status && !Task.VALID_STATUSES.includes(task.status)) {
        errors.push(`Task at index ${index} has invalid status`);
      }
    });

    if (errors.length > 0) {
      return ResponseUtils.badRequest(res, "Validation errors", errors);
    }

    // Clean data
    req.body.tasks = tasks.map((task) => ({
      task: task.task.trim(),
      status: task.status || Task.STATUSES.TODO,
    }));

    next();
  }
}

module.exports = ValidationMiddleware;
