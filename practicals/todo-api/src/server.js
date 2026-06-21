const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const ErrorHandler = require("./middleware/errorHandler");
const db = require("./config/database");

/**
 * Main Server Class
 */
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
    // JSON parsing
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Request logging (simple)
    this.app.use((req, res, next) => {
      console.log(`📥 ${req.method} ${req.url}`);
      next();
    });

    // CORS headers (for development)
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept",
      );
      if (req.method === "OPTIONS") {
        return res.sendStatus(200);
      }
      next();
    });
  }

  /**
   * Configure application routes
   */
  configureRoutes() {
    // Welcome route
    this.app.get("/", (req, res) => {
      res.json({
        name: "Todo API",
        version: "1.0.0",
        description: "A simple Todo API with Express.js",
        endpoints: {
          "GET /todo": "Get all tasks (filter by ?status=)",
          "GET /todo/:id": "Get task by ID",
          "GET /todo/stats": "Get task statistics",
          "POST /todo": "Create a new task",
          "POST /todo/bulk": "Bulk create tasks",
          "PUT /todo/:id": "Update a task",
          "PATCH /todo/:id/status": "Update task status",
          "DELETE /todo/:id": "Delete a task",
        },
        taskStructure: {
          id: "number (auto-generated)",
          task: "string (required)",
          status: '"todo" | "doing" | "done" (default: "todo")',
        },
        timestamp: new Date().toISOString(),
      });
    });

    // Task routes
    this.app.use("/todo", taskRoutes);
  }

  /**
   * Configure error handling
   */
  configureErrorHandling() {
    // 404 handler
    this.app.use(ErrorHandler.notFound);

    // Global error handler
    this.app.use(ErrorHandler.handle);

    // Uncaught exceptions
    process.on("uncaughtException", ErrorHandler.uncaughtException);
    process.on("unhandledRejection", ErrorHandler.unhandledRejection);
  }

  /**
   * Start the server
   */
  start() {
    this.app.listen(this.port, () => {
      console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   📋 Todo API Server                                         ║
║   🚀 Running at: http://localhost:${this.port}                 ║
║                                                               ║
║   📊 Database Status:                                        ║
║   ├─ Total Tasks: ${db.getTaskCount()}                         ║
║   ├─ Todo: ${db.getTasksByStatus("todo").length}                 ║
║   ├─ Doing: ${db.getTasksByStatus("doing").length}               ║
║   └─ Done: ${db.getTasksByStatus("done").length}                 ║
║                                                               ║
║   📌 Available Endpoints:                                     ║
║   ├─ GET    /todo            - List all tasks                ║
║   ├─ GET    /todo?status=X   - Filter tasks by status        ║
║   ├─ GET    /todo/:id        - Get task by ID               ║
║   ├─ GET    /todo/stats      - Get statistics               ║
║   ├─ POST   /todo            - Create a task                ║
║   ├─ POST   /todo/bulk       - Bulk create tasks            ║
║   ├─ PUT    /todo/:id        - Update a task                ║
║   ├─ PATCH  /todo/:id/status - Update task status           ║
║   └─ DELETE /todo/:id        - Delete a task                ║
║                                                               ║
║   📝 Task Structure:                                         ║
║   {                                                          ║
║     id: number,                                              ║
║     task: string,                                            ║
║     status: "todo" | "doing" | "done"                       ║
║   }                                                          ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
      `);
    });
  }

  /**
   * Stop the server gracefully
   */
  stop() {
    console.log("\n🛑 Shutting down server...");
    process.exit(0);
  }
}

// Start the server if this file is run directly
if (require.main === module) {
  const server = new Server();
  server.start();

  // Graceful shutdown
  process.on("SIGINT", () => {
    console.log("\n📴 Received SIGINT signal");
    server.stop();
  });

  process.on("SIGTERM", () => {
    console.log("\n📴 Received SIGTERM signal");
    server.stop();
  });
}

module.exports = Server;
