import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TaskSchema = new Schema({
  title: String,
  description: String,
  status: String,
  dueDate: Date,
  assignedUser: String,
  tags: [String],
  priority: String,
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

const Task = model("Task", TaskSchema);
export default Task;
