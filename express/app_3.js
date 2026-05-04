const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const Blog = require("./models/blog");

// express app
const app = express();

// connect to mongodb
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("DB connected");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// listen for requests
// app.listen(3000);

// middleware & static files
app.use(express.static("public"));
app.use(morgan("dev"));

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "New Blog",
    snippet: "About my new blog",
    body: "More about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("69f89c075353d410b0ccbe5c")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
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
