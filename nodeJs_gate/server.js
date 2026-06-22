const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  // Handle GET request
  if (req.method === "GET" && req.url === "/") {
    res.setHeader("Content-Type", "text/plain");

    fs.readFile("./content/input.txt", (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        return res.end("Internal Server Error");
      }

      res.statusCode = 200;
      res.end(data);
    });
  }

  // Handle POST request
  else if (req.method === "POST" && req.url === "/") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      fs.writeFile("./content/output.txt", body, (err) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          return res.end("Internal Server Error");
        }

        res.statusCode = 201;
        res.setHeader("Content-Type", "text/plain");
        res.end("Data written successfully");
      });
    });
  }

  // Handle unknown routes
  else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Page not found");
  }
});

server.listen(3000, "localhost", () => {
  console.log("Server running at http://localhost:3000");
});
