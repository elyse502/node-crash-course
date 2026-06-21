const ResponseUtils = require("../utils/responseUtils");

/**
 * Global Error Handler Middleware
 * Handles all errors in the application
 */
class ErrorHandler {
  /**
   * Main error handler
   */
  static handle(err, req, res, next) {
    console.error("❌ Error:", err.message);
    console.error("Stack:", err.stack);

    // Handle specific error types
    if (err.message.includes("not found")) {
      return ResponseUtils.notFound(res, err.message);
    }

    if (err.message.includes("Invalid status")) {
      return ResponseUtils.badRequest(res, err.message);
    }

    if (err.message.includes("required") || err.message.includes("at least")) {
      return ResponseUtils.badRequest(res, err.message);
    }

    // Default to 500 Internal Server Error
    ResponseUtils.internalError(
      res,
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
    );
  }

  /**
   * Handle 404 Not Found for undefined routes
   */
  static notFound(req, res) {
    ResponseUtils.notFound(res, `Route ${req.method} ${req.url} not found`);
  }

  /**
   * Handle uncaught exceptions
   */
  static uncaughtException(err) {
    console.error("💥 Uncaught Exception:", err);
    console.error("Stack:", err.stack);
    // Gracefully shut down
    process.exit(1);
  }

  /**
   * Handle unhandled rejections
   */
  static unhandledRejection(err) {
    console.error("💥 Unhandled Rejection:", err);
    console.error("Stack:", err.stack);
    // Gracefully shut down
    process.exit(1);
  }
}

module.exports = ErrorHandler;
