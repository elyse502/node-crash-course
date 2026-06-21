const Logger = require("../utils/logger");

/**
 * Request Logger Middleware
 * Logs HTTP method, URL, timestamp, and response time for each request
 */
class RequestLogger {
  /**
   * Middleware function to log incoming requests
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  static log(req, res, next) {
    // Capture the start time
    const startTime = Date.now();

    // Store original end function to intercept it
    const originalEnd = res.end;
    const originalJson = res.json;
    const originalSend = res.send;

    // Flag to ensure we only log once
    let isLogged = false;

    // Create a function to log response time
    const logResponseTime = () => {
      if (isLogged) return;
      isLogged = true;

      const responseTime = Date.now() - startTime;

      // Log the request details
      Logger.logRequest(req.method, req.url, responseTime);
    };

    // Override res.end
    res.end = function (...args) {
      logResponseTime();
      return originalEnd.apply(this, args);
    };

    // Override res.json
    res.json = function (...args) {
      logResponseTime();
      return originalJson.apply(this, args);
    };

    // Override res.send
    res.send = function (...args) {
      logResponseTime();
      return originalSend.apply(this, args);
    };

    // Also log if the response emits 'finish' event (safety net)
    res.on("finish", () => {
      logResponseTime();
    });

    // Handle errors
    res.on("error", (err) => {
      if (!isLogged) {
        const responseTime = Date.now() - startTime;
        Logger.log(
          `[${Logger.getTimestamp()}] ${req.method} ${req.url} - ERROR: ${err.message} - ${responseTime}ms`,
          "error",
        );
        isLogged = true;
      }
    });

    // Continue to the next middleware/route handler
    next();
  }

  /**
   * Alternative simpler implementation using middleware pattern
   * This version is less intrusive but may not capture all scenarios
   */
  static logSimple(req, res, next) {
    const start = Date.now();

    // Use the 'finish' event to log after response is sent
    res.on("finish", () => {
      const responseTime = Date.now() - start;
      Logger.logRequest(req.method, req.url, responseTime);
    });

    next();
  }
}

module.exports = RequestLogger;
