/**
 * Task Model
 * Defines the task structure and validation
 */
class Task {
  /**
   * Valid status values
   */
  static STATUSES = {
    TODO: "todo",
    DOING: "doing",
    DONE: "done",
  };

  /**
   * Array of valid statuses for validation
   */
  static VALID_STATUSES = Object.values(this.STATUSES);

  /**
   * Create a new Task instance
   * @param {Object} data - Task data
   * @param {string} data.task - Task description
   * @param {string} data.status - Task status
   * @param {number} data.id - Task ID (optional)
   */
  constructor({ id, task, status }) {
    this.id = id;
    this.task = task;
    this.status = status || Task.STATUSES.TODO;
  }

  /**
   * Validate task data
   * @param {Object} data - Task data to validate
   * @returns {Object} Validation result
   */
  static validate(data) {
    const errors = [];

    // Validate task field
    if (!data.task || data.task.trim() === "") {
      errors.push("Task description is required");
    } else if (data.task.length < 3) {
      errors.push("Task description must be at least 3 characters");
    } else if (data.task.length > 200) {
      errors.push("Task description must be less than 200 characters");
    }

    // Validate status field
    if (data.status && !Task.VALID_STATUSES.includes(data.status)) {
      errors.push(`Status must be one of: ${Task.VALID_STATUSES.join(", ")}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Create a Task from plain object
   * @param {Object} data - Task data
   * @returns {Task} Task instance
   */
  static fromObject(data) {
    return new Task({
      id: data.id,
      task: data.task,
      status: data.status,
    });
  }

  /**
   * Convert task to JSON
   * @returns {Object} JSON representation
   */
  toJSON() {
    return {
      id: this.id,
      task: this.task,
      status: this.status,
    };
  }

  /**
   * Update task status
   * @param {string} newStatus - New status
   * @returns {Task} Updated task
   */
  updateStatus(newStatus) {
    if (!Task.VALID_STATUSES.includes(newStatus)) {
      throw new Error(`Invalid status: ${newStatus}`);
    }
    this.status = newStatus;
    return this;
  }

  /**
   * Check if task is in a specific status
   * @param {string} status - Status to check
   * @returns {boolean} True if task has the status
   */
  hasStatus(status) {
    return this.status === status;
  }

  /**
   * Get status label for display
   * @returns {string} Human-readable status
   */
  getStatusLabel() {
    const labels = {
      todo: "To Do",
      doing: "In Progress",
      done: "Completed",
    };
    return labels[this.status] || this.status;
  }
}

module.exports = Task;
