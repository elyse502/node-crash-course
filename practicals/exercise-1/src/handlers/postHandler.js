const FileService = require("../services/fileService");
const ResponseUtils = require("../utils/responseUtils");

/**
 * Handler for POST requests
 */
class PostHandler {
  /**
   * Handle POST request - write request body to output.txt
   * @param {Object} req - HTTP request object
   * @param {Object} res - HTTP response object
   */
  static async handle(req, res) {
    // Collect request body data
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        // Validate that data was sent
        if (!body || body.trim() === "") {
          return ResponseUtils.sendError(
            res,
            400,
            "No data provided in request body",
          );
        }

        // Write data to output.txt using streams
        await FileService.writeFile("output.txt", body);

        // Send success response
        ResponseUtils.sendSuccess(
          res,
          201,
          "Data successfully written to output.txt",
        );
      } catch (error) {
        // Handle any errors
        ResponseUtils.sendInternalError(res, error.message);
      }
    });

    // Handle any errors during request streaming
    req.on("error", (error) => {
      ResponseUtils.sendInternalError(res, `Request error: ${error.message}`);
    });
  }
}

module.exports = PostHandler;
