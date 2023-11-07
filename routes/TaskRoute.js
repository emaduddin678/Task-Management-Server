import express from "express";
import {
  addTask,
  deleteTask,
  getAllTask,
  getSingleTask,
  updateTask,
} from "../controllers/TaskController.js";
import { verifyUser } from "../utils/verifyToken.js";

const TaskRouter = express.Router();

// Create a new task
TaskRouter.post("/task", verifyUser, addTask);

// Retrieve al of tasks
TaskRouter.get("/tasks", verifyUser, getAllTask);
// Retrieve a single tasks
TaskRouter.get("/tasks/:id", verifyUser, getSingleTask);

// Update a task by ID
TaskRouter.put("/task/:id", updateTask);

// Delete a task by ID
TaskRouter.delete("/tasks/:id", deleteTask);

TaskRouter.get("/taskrouter", (req, res) => {
  res.send("Hello, this is TaskRouter endpoint!");
});

export default TaskRouter;
