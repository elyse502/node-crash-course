/**
 * Response Utilities
 * Standardized API response formatting
 */
class ResponseUtils {
  /**
   * Send success response
   * @param {Object} res - Express response object
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Success message
   * @param {Object} data - Response data
   */
  static success(res, statusCode = 200, message = "Success", data = null) {
    const response = {
      success: true,
      message,
      timestamp: new Date().toISOString(),
    };

    if (data !== null) {
      response.data = data;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Send error response
   * @param {Object} res - Express response object
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message
   * @param {Array} errors - Validation errors (optional)
   */
  static error(res, statusCode = 400, message = "Error", errors = null) {
    const response = {
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Send 200 OK with data
   * @param {Object} res - Express response object
   * @param {Object} data - Response data
   */
  static ok(res, data) {
    return this.success(res, 200, "Success", data);
  }

  /**
   * Send 201 Created with data
   * @param {Object} res - Express response object
   * @param {Object} data - Created resource data
   */
  static created(res, data) {
    return this.success(res, 201, "Resource created successfully", data);
  }

  /**
   * Send 400 Bad Request
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @param {Array} errors - Validation errors
   */
  static badRequest(res, message = "Bad request", errors = null) {
    return this.error(res, 400, message, errors);
  }

  /**
   * Send 404 Not Found
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   */
  static notFound(res, message = "Resource not found") {
    return this.error(res, 404, message);
  }

  /**
   * Send 500 Internal Server Error
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   */
  static internalError(res, message = "Internal server error") {
    return this.error(res, 500, message);
  }

  /**
   * Send paginated response
   * @param {Object} res - Express response object
   * @param {Array} data - Data array
   * @param {number} total - Total count
   * @param {number} page - Current page
   * @param {number} limit - Items per page
   */
  static paginated(res, data, total, page = 1, limit = 10) {
    const totalPages = Math.ceil(total / limit);

    return this.success(res, 200, "Success", {
      items: data,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    });
  }
}

module.exports = ResponseUtils;
