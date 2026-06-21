const http = require("node:http");
const GetHandler = require("./handlers/getHandler");
const PostHandler = require("./handlers/postHandler");
const ResponseUtils = require("./utils/responseUtils");

/**
 * Main HTTP Server
 */
class Server {
  constructor() {
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  /**
   * Handle incoming HTTP requests
   * @param {Object} req - HTTP request object
   * @param {Object} res - HTTP response object
   */
  async handleRequest(req, res) {
    const { method, url } = req;

    console.log(`[${new Date().toISOString()}] ${method} ${url}`);

    // Route handling
    if (url === "/" || url === "/input.txt") {
      if (method === "GET") {
        await GetHandler.handle(req, res);
      } else if (method === "POST") {
        await PostHandler.handle(req, res);
      } else {
        ResponseUtils.sendError(res, 405, `Method ${method} not allowed`);
      }
    } else {
      ResponseUtils.sendNotFound(res);
    }
  }

  /**
   * Start the server
   * @param {number} port - Port number to listen on
   * @param {Function} callback - Callback function when server starts
   */
  start(port = 3000, callback = null) {
    this.server.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
      console.log(`📂 GET  / - Read input.txt`);
      console.log(`📝 POST / - Write to output.txt`);

      if (callback) {
        callback();
      }
    });
  }

  /**
   * Stop the server
   */
  stop() {
    this.server.close(() => {
      console.log("🛑 Server stopped");
    });
  }
}

// Start the server if this file is run directly
if (require.main === module) {
  const server = new Server();
  server.start(3000);
}

module.exports = Server;
