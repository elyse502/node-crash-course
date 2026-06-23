const http = require("node:http");

const tasks = [];
let nextId = 1;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  res.setHeader("Content-Type", "application/json");

  // POST /todo
  if (req.method === "POST" && pathname === "/todo") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const { task, status } = JSON.parse(body);

        if (!task || !["todo", "doing", "done"].includes(status)) {
          res.statusCode = 400;
          return res.end(
            JSON.stringify({
              message: "Invalid task or status",
            }),
          );
        }

        const newTask = {
          id: nextId++,
          task,
          status,
        };

        tasks.push(newTask);

        res.statusCode = 201;
        res.end(JSON.stringify(newTask));
      } catch {
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            message: "Invalid JSON",
          }),
        );
      }
    });
  }

  // GET /todo
  else if (req.method === "GET" && pathname === "/todo") {
    const status = url.searchParams.get("status");

    let result = tasks;

    if (status) {
      result = tasks.filter((task) => task.status === status);
    }

    res.statusCode = 200;
    res.end(JSON.stringify(result));
  }

  // GET /todo/:id
  else if (req.method === "GET" && pathname.startsWith("/todo/")) {
    const id = Number(pathname.split("/")[2]);

    const task = tasks.find((task) => task.id === id);

    if (!task) {
      res.statusCode = 404;
      return res.end(
        JSON.stringify({
          message: "Task not found",
        }),
      );
    }

    res.statusCode = 200;
    res.end(JSON.stringify(task));
  }

  // Route not found
  else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        message: "Not found",
      }),
    );
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
