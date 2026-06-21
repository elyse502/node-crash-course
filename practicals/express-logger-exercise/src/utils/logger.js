/**
 * Logger utility for consistent logging across the application
 */
class Logger {
  /**
   * Get current timestamp in ISO format
   * @returns {string} ISO timestamp
   */
  static getTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Format log message
   * @param {string} method - HTTP method
   * @param {string} url - Request URL
   * @param {number} responseTime - Response time in milliseconds
   * @returns {string} Formatted log message
   */
  static formatRequestLog(method, url, responseTime) {
    return `[${this.getTimestamp()}] ${method} ${url} - ${responseTime}ms`;
  }

  /**
   * Log to console with color coding
   * @param {string} message - Log message
   * @param {string} type - Log type (info, error, warn)
   */
  static log(message, type = "info") {
    const colors = {
      info: "\x1b[36m", // Cyan
      success: "\x1b[32m", // Green
      warn: "\x1b[33m", // Yellow
      error: "\x1b[31m", // Red
    };

    const resetColor = "\x1b[0m";
    const color = colors[type] || colors.info;

    console.log(`${color}${message}${resetColor}`);
  }

  /**
   * Log request details
   * @param {string} method - HTTP method
   * @param {string} url - Request URL
   * @param {number} responseTime - Response time in milliseconds
   */
  static logRequest(method, url, responseTime) {
    const message = this.formatRequestLog(method, url, responseTime);
    const type = this.getLogType(responseTime);
    this.log(message, type);
  }

  /**
   * Determine log type based on response time
   * @param {number} responseTime - Response time in milliseconds
   * @returns {string} Log type (success, info, warn)
   */
  static getLogType(responseTime) {
    if (responseTime < 100) {
      return "success";
    } else if (responseTime < 500) {
      return "info";
    } else {
      return "warn";
    }
  }
}

module.exports = Logger;
