const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //   console.log("Request made.");
  //   console.log(req);
  console.log(req.url, req.method);

  // Set header content type
  // res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Type", "text/html");

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      break;
    case "/about":
      path += "about.html";
      break;
    default:
      path += "404.html";
      break;
  }

  // Send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      // res.write(data);
      // res.end();
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("Listening for requests on port 3000");
});
