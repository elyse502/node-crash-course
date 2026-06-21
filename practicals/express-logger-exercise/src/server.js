const express = require("express");
const RequestLogger = require("./middleware/requestLogger");
const loggerConfig = require("./middleware/loggerConfig");
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    // Configure middleware
    this.configureMiddleware();

    // Configure routes
    this.configureRoutes();

    // Configure error handling
    this.configureErrorHandling();
  }

  /**
   * Configure application middleware
   */
  configureMiddleware() {
    // JSON parsing middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Request Logger Middleware - applied to ALL routes
    // Option 1: Using the full version with response interception
    this.app.use(RequestLogger.log);

    // Option 2: Using the simpler version (uncomment to use)
    // this.app.use(RequestLogger.logSimple);

    // Option 3: Using configured middleware
    // const customLogger = loggerConfig.createMiddleware({
    //   logBody: true,
    //   logQuery: true
    // });
    // this.app.use(customLogger);

    // Log all requests (simple console logging)
    this.app.use((req, res, next) => {
      console.log(`📥 Incoming: ${req.method} ${req.url}`);
      next();
    });
  }

  /**
   * Configure application routes
   */
  configureRoutes() {
    // Home/Index routes
    this.app.use("/", indexRoutes);

    // Users routes
    this.app.use("/users", userRoutes);
  }

  /**
   * Configure error handling
   */
  configureErrorHandling() {
    // 404 handler for undefined routes
    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        error: `Route ${req.method} ${req.url} not found`,
      });
    });

    // Global error handler
    this.app.use((err, req, res, next) => {
      console.error("❌ Error:", err.message);
      console.error("Stack:", err.stack);

      res.status(err.status || 500).json({
        success: false,
        error: err.message || "Internal Server Error",
        timestamp: new Date().toISOString(),
      });
    });
  }

  /**
   * Start the server
   */
  start() {
    this.app.listen(this.port, () => {
      console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 Express Logger Exercise Server                  ║
║   📡 Running on: http://localhost:${this.port}          ║
║                                                       ║
║   📋 Available Routes:                               ║
║   GET  /            - Home                           ║
║   GET  /users       - List users                    ║
║   GET  /users/:id   - Get user by ID                ║
║   POST /users       - Create user                   ║
║   DELETE /users/:id - Delete user                   ║
║                                                       ║
║   📝 Logs will appear in the console                  ║
║   Format: [timestamp] METHOD /url - Xms              ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
      `);
    });
  }

  /**
   * Get Express app instance (for testing)
   */
  getApp() {
    return this.app;
  }
}

// Start the server if this file is run directly
if (require.main === module) {
  const server = new Server();
  server.start();
}

module.exports = Server;
