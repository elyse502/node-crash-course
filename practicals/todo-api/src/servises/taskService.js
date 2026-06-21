const db = require("../config/database");
const Task = require("../models/Task");

/**
 * Task Service
 * Handles business logic for task operations
 */
class TaskService {
  /**
   * Get all tasks with optional status filter
   * @param {string} status - Filter by status (optional)
   * @returns {Array} Array of task objects
   */
  getAllTasks(status = null) {
    let tasks = db.getAllTasks();

    // Filter by status if provided
    if (status) {
      if (!Task.VALID_STATUSES.includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }
      tasks = db.getTasksByStatus(status);
    }

    return tasks;
  }

  /**
   * Get a single task by ID
   * @param {number} id - Task ID
   * @returns {Object} Task object
   * @throws {Error} If task not found
   */
  getTaskById(id) {
    const task = db.getTaskById(id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    return task;
  }

  /**
   * Create a new task
   * @param {Object} data - Task data
   * @param {string} data.task - Task description
   * @param {string} data.status - Task status (optional)
   * @returns {Object} Created task
   * @throws {Error} If validation fails
   */
  createTask(data) {
    // Validate task data
    const validation = Task.validate(data);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    // Set default status if not provided
    const status = data.status || Task.STATUSES.TODO;

    // Create the task
    const task = db.createTask(data.task, status);
    return task;
  }

  /**
   * Update a task
   * @param {number} id - Task ID
   * @param {Object} updates - Fields to update
   * @returns {Object} Updated task
   * @throws {Error} If task not found or validation fails
   */
  updateTask(id, updates) {
    // Check if task exists
    const existingTask = db.getTaskById(id);
    if (!existingTask) {
      throw new Error(`Task with ID ${id} not found`);
    }

    // Validate updates if provided
    if (updates.task !== undefined || updates.status !== undefined) {
      const validation = Task.validate({
        task: updates.task || existingTask.task,
        status: updates.status || existingTask.status,
      });

      if (!validation.isValid) {
        throw new Error(validation.errors.join(", "));
      }
    }

    // Update the task
    const updatedTask = db.updateTask(id, updates);
    return updatedTask;
  }

  /**
   * Delete a task
   * @param {number} id - Task ID
   * @returns {boolean} True if deleted
   * @throws {Error} If task not found
   */
  deleteTask(id) {
    const deleted = db.deleteTask(id);
    if (!deleted) {
      throw new Error(`Task with ID ${id} not found`);
    }
    return true;
  }

  /**
   * Get task statistics
   * @returns {Object} Statistics object
   */
  getStats() {
    const allTasks = db.getAllTasks();
    const total = allTasks.length;
    const todo = allTasks.filter((t) => t.status === Task.STATUSES.TODO).length;
    const doing = allTasks.filter(
      (t) => t.status === Task.STATUSES.DOING,
    ).length;
    const done = allTasks.filter((t) => t.status === Task.STATUSES.DONE).length;

    return {
      total,
      todo,
      doing,
      done,
      completionRate: total > 0 ? Math.round((done / total) * 100) : 0,
    };
  }

  /**
   * Bulk create tasks
   * @param {Array} tasksData - Array of task data
   * @returns {Array} Created tasks
   */
  bulkCreate(tasksData) {
    const createdTasks = [];
    const errors = [];

    tasksData.forEach((data, index) => {
      try {
        const task = this.createTask(data);
        createdTasks.push(task);
      } catch (error) {
        errors.push({
          index,
          data,
          error: error.message,
        });
      }
    });

    return {
      created: createdTasks,
      errors: errors.length > 0 ? errors : null,
    };
  }
}

module.exports = new TaskService();
