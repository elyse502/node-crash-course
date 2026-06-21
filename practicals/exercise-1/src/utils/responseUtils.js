/**
 * Utility functions for sending HTTP responses
 */
class ResponseUtils {
  /**
   * Send a success response
   * @param {Object} res - HTTP response object
   * @param {number} statusCode - HTTP status code
   * @param {string|Object} data - Response data
   */
  static sendSuccess(res, statusCode, data) {
    res.writeHead(statusCode, { "Content-Type": "text/plain" });
    res.end(data);
  }

  /**
   * Send an error response
   * @param {Object} res - HTTP response object
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message
   */
  static sendError(res, statusCode, message) {
    res.writeHead(statusCode, { "Content-Type": "text/plain" });
    res.end(`Error ${statusCode}: ${message}`);
  }

  /**
   * Send a 404 Not Found response
   * @param {Object} res - HTTP response object
   */
  static sendNotFound(res) {
    this.sendError(res, 404, "Route not found");
  }

  /**
   * Send a 500 Internal Server Error response
   * @param {Object} res - HTTP response object
   * @param {string} message - Error message
   */
  static sendInternalError(res, message = "Internal Server Error") {
    this.sendError(res, 500, message);
  }
}

module.exports = ResponseUtils;
