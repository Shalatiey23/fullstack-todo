const express = require('express');
const {
  addTask,
  updateTask,
  deleteTask,
  getAll,
} = require("../controller/todoController");
const routes = express.Router();

routes.post("/task", addTask);
routes.get("/task", getAll);
routes.put("/task/:id", updateTask);
routes.delete("/task/:id", deleteTask);


module.exports = routes
