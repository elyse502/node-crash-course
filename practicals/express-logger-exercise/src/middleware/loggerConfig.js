/**
 * Logger Configuration
 * Allows customization of logging behavior
 */
class LoggerConfig {
  constructor() {
    this.options = {
      logBody: false,
      logHeaders: false,
      logQuery: false,
      timeFormat: "ISO", // 'ISO' or 'locale'
    };
  }

  /**
   * Configure logger options
   * @param {Object} options - Configuration options
   */
  configure(options = {}) {
    this.options = { ...this.options, ...options };
  }

  /**
   * Get current configuration
   * @returns {Object} Configuration object
   */
  getConfig() {
    return this.options;
  }

  /**
   * Create middleware with custom configuration
   * @param {Object} options - Configuration options
   * @returns {Function} Configured middleware
   */
  createMiddleware(options = {}) {
    this.configure(options);
    const RequestLogger = require("./requestLogger");
    return RequestLogger.log.bind(RequestLogger);
  }
}

module.exports = new LoggerConfig();
