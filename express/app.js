const express = require("express");

// express app
const app = express();

// listen for requests
app.listen(3000);

app.get("/", (req, res) => {
  //   res.send("<p>Home page</p>");
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  //   res.send("<p>About page</p>");
  res.sendFile("./views/about.html", { root: __dirname });
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page - must be at the end of all routes
/**
 * This should be the last route because it will match all the routes
 * that are not defined above and it will send the 404 page, in case we
 * have placed it in between where we have other routes above they won't
 * get reached because it's synchronous.
 */
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
