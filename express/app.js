const express = require("express");

// express app
const app = express();

// register view engine
app.set("view engine", "ejs");
// app.set("views", "myviews"); // default is views folder, if we want to change it we can use this line of code

// listen for requests
app.listen(3000);

// middleware - executes for every request made to the server
app.use((req, res, next) => {
  console.log("New request made:");
  console.log("Host: ", req.hostname);
  console.log("Path: ", req.path);
  console.log("Method: ", req.method);
  next();
});

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat Bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];

  res.render("index", { title: "Home", blogs });
});

// This middleware will execute only for the /about route, because it is defined after the / route
app.use((req, res, next) => {
  console.log("In the next middleware...");
  next();
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// another route
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
