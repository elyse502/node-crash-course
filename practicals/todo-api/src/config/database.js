/**
 * In-memory database for tasks
 * Simulates a database for learning purposes
 */
class Database {
  constructor() {
    this.tasks = [];
    this.currentId = 1;
  }

  /**
   * Get all tasks
   * @returns {Array} Array of all tasks
   */
  getAllTasks() {
    return this.tasks;
  }

  /**
   * Get task by ID
   * @param {number} id - Task ID
   * @returns {Object|null} Task object or null if not found
   */
  getTaskById(id) {
    return this.tasks.find((task) => task.id === id) || null;
  }

  /**
   * Get tasks by status
   * @param {string} status - Task status (todo, doing, done)
   * @returns {Array} Filtered tasks
   */
  getTasksByStatus(status) {
    return this.tasks.filter((task) => task.status === status);
  }

  /**
   * Create a new task
   * @param {string} task - Task description
   * @param {string} status - Task status
   * @returns {Object} Created task
   */
  createTask(task, status = "todo") {
    const newTask = {
      id: this.currentId++,
      task: task.trim(),
      status: status,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  /**
   * Update a task
   * @param {number} id - Task ID
   * @param {Object} updates - Fields to update
   * @returns {Object|null} Updated task or null if not found
   */
  updateTask(id, updates) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return null;

    const updatedTask = {
      ...this.tasks[index],
      ...updates,
      id: this.tasks[index].id, // Ensure ID doesn't change
    };

    this.tasks[index] = updatedTask;
    return updatedTask;
  }

  /**
   * Delete a task
   * @param {number} id - Task ID
   * @returns {boolean} True if deleted, false if not found
   */
  deleteTask(id) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }

  /**
   * Clear all tasks (for testing)
   */
  clearAllTasks() {
    this.tasks = [];
    this.currentId = 1;
  }

  /**
   * Get task count
   * @returns {number} Number of tasks
   */
  getTaskCount() {
    return this.tasks.length;
  }
}

// Create and export a singleton instance
const db = new Database();

// Seed with some initial tasks
db.createTask("Learn Node.js fundamentals", "doing");
db.createTask("Build a REST API", "todo");
db.createTask("Write documentation", "done");

module.exports = db;
