const express = require("express");
const tasks = express.Router();
const createTasks = require("../controllers/ControllerTasks.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
tasks.post("/auth/tasks", authMiddleware, createTasks.createTask);
tasks.get("/auth/getTasks", authMiddleware, createTasks.getTasks);
tasks.delete(
  `/auth/removeTasks/:taskSelected`,
  authMiddleware,
  createTasks.deleteTask
);
tasks.patch("/auth/updateTask/:id", authMiddleware, createTasks.updateTask);
tasks.put(
  "/auth/concluidedTask/:taskSelected",
  authMiddleware,
  createTasks.concluidedTask
);
tasks.get(
  "/auth/getTasksConcluided",
  authMiddleware,
  createTasks.getTasksConcluided
);
tasks.get(
  "/auth/getTasksPermanent",
  authMiddleware,
  createTasks.getTasksPermanent
);
tasks.delete(
  `/auth/deleteTaskPermanent/:taskSelected`,
  authMiddleware,
  createTasks.deleteTaskPermants
);

module.exports = tasks;
