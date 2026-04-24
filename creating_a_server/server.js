const http = require("http");

const server = http.createServer((req, res) => {
  //   console.log("Request made.");
  //   console.log(req);
  console.log(req.url, req.method);

  // Set header content type
  // res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Type", "text/html");

  res.write('<head><link rel="stylesheet" href="#"/></head>');
  res.write("<h1>Hello, Devs!</h1>");
  res.write("<h1>Hello again, Devs!</h1>");
  res.end();
});

server.listen(3000, "localhost", () => {
  console.log("Listening for requests on port 3000");
});
