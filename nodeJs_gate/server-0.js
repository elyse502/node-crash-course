const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  res.setHeader("Content-Type", "text/plain");

  let path;

  if (req.url === "/") {
    path = "./content/input.txt";
    res.statusCode = 200;

    fs.readFile(path, (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      } else {
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.end("Page not found");
  }
});

server.listen(3000, "localhost", () => {
  console.log("Server running on http://localhost:3000");
});
