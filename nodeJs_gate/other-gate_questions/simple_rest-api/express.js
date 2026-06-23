const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const tasks = [];
let nextId = 1;

// POST /todo
app.post("/todo", (req, res) => {
  const { task, status } = req.body;

  if (!task || !["todo", "doing", "done"].includes(status)) {
    return res.status(400).json({
      message: "Invalid task or status",
    });
  }

  const newTask = {
    id: nextId++,
    task,
    status,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// GET /todo
app.get("/todo", (req, res) => {
  const { status } = req.query;

  if (status) {
    const filteredTasks = tasks.filter((task) => task.status === status);

    return res.json(filteredTasks);
  }

  res.json(tasks);
});

// GET /todo/:id
app.get("/todo/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.json(task);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
