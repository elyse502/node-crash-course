const FileService = require("../services/fileService");
const ResponseUtils = require("../utils/responseUtils");

/**
 * Handler for GET requests
 */
class GetHandler {
  /**
   * Handle GET request - read and return contents of input.txt
   * @param {Object} req - HTTP request object
   * @param {Object} res - HTTP response object
   */
  static async handle(req, res) {
    try {
      // Check if input.txt exists
      if (!FileService.fileExists("input.txt")) {
        return ResponseUtils.sendNotFound(res);
      }

      // Read the file using streams
      const content = await FileService.readFile("input.txt");

      // Send success response
      ResponseUtils.sendSuccess(res, 200, content);
    } catch (error) {
      // Handle any errors
      ResponseUtils.sendInternalError(res, error.message);
    }
  }
}

module.exports = GetHandler;
