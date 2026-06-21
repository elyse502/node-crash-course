const taskService = require("../services/taskService");
const ResponseUtils = require("../utils/responseUtils");
const Task = require("../models/Task");

/**
 * Task Controller
 * Handles HTTP requests and responses for task operations
 */
class TaskController {
  /**
   * GET /todo - Get all tasks
   * Query params: ?status=todo|doing|done
   */
  static async getAllTasks(req, res, next) {
    try {
      const { status } = req.query;

      let tasks;
      if (status) {
        tasks = taskService.getAllTasks(status);
      } else {
        tasks = taskService.getAllTasks();
      }

      // Get stats
      const stats = taskService.getStats();

      ResponseUtils.ok(res, {
        tasks,
        stats,
        count: tasks.length,
        filter: status || "all",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /todo/:id - Get task by ID
   */
  static async getTaskById(req, res, next) {
    try {
      const id = Number.parseInt(req.params.id);

      if (Number.isNaN(id)) {
        return ResponseUtils.badRequest(res, "Invalid task ID format");
      }

      const task = taskService.getTaskById(id);
      ResponseUtils.ok(res, task);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /todo - Create a new task
   * Body: { task: string, status?: string }
   */
  static async createTask(req, res, next) {
    try {
      const { task, status } = req.body;

      // Validate required fields
      if (!task || task.trim() === "") {
        return ResponseUtils.badRequest(res, "Task description is required");
      }

      // Create task
      const newTask = taskService.createTask({
        task: task.trim(),
        status: status || Task.STATUSES.TODO,
      });

      ResponseUtils.created(res, newTask);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /todo/:id - Update a task
   * Body: { task?: string, status?: string }
   */
  static async updateTask(req, res, next) {
    try {
      const id = Number.parseInt(req.params.id);

      if (Number.isNaN(id)) {
        return ResponseUtils.badRequest(res, "Invalid task ID format");
      }

      const { task, status } = req.body;

      // Validate at least one field to update
      if (!task && !status) {
        return ResponseUtils.badRequest(
          res,
          "At least one field (task or status) is required",
        );
      }

      const updates = {};
      if (task !== undefined) updates.task = task.trim();
      if (status !== undefined) updates.status = status;

      const updatedTask = taskService.updateTask(id, updates);
      ResponseUtils.ok(res, updatedTask);
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /todo/:id - Delete a task
   */
  static async deleteTask(req, res, next) {
    try {
      const id = Number.parseInt(req.params.id);

      if (Number.isNaN(id)) {
        return ResponseUtils.badRequest(res, "Invalid task ID format");
      }

      taskService.deleteTask(id);
      ResponseUtils.success(res, 200, "Task deleted successfully", { id });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /todo/:id/status - Update task status
   * Body: { status: "todo" | "doing" | "done" }
   */
  static async updateTaskStatus(req, res, next) {
    try {
      const id = Number.parseInt(req.params.id);

      if (Number.isNaN(id)) {
        return ResponseUtils.badRequest(res, "Invalid task ID format");
      }

      const { status } = req.body;

      if (!status) {
        return ResponseUtils.badRequest(res, "Status is required");
      }

      if (!Task.VALID_STATUSES.includes(status)) {
        return ResponseUtils.badRequest(
          res,
          `Invalid status. Must be one of: ${Task.VALID_STATUSES.join(", ")}`,
        );
      }

      const updatedTask = taskService.updateTask(id, { status });
      ResponseUtils.ok(res, updatedTask);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /todo/stats - Get task statistics
   */
  static async getStats(req, res, next) {
    try {
      const stats = taskService.getStats();
      ResponseUtils.ok(res, stats);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /todo/bulk - Bulk create tasks
   * Body: { tasks: [{ task: string, status?: string }] }
   */
  static async bulkCreate(req, res, next) {
    try {
      const { tasks } = req.body;

      if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
        return ResponseUtils.badRequest(
          res,
          "Tasks array is required and must not be empty",
        );
      }

      const result = taskService.bulkCreate(tasks);

      if (result.errors) {
        return res.status(207).json({
          success: true,
          message: "Partial success",
          data: result.created,
          errors: result.errors,
          timestamp: new Date().toISOString(),
        });
      }

      ResponseUtils.created(res, {
        created: result.created,
        count: result.created.length,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;
