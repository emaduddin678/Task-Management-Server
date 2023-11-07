import Task from "../models/TaskModel.js";

export const addTask = async (req, res, next) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(200).json(savedTask);
  } catch (error) {
    next(error);
  }
};

export const getAllTask = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getSingleTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedTask);
  } catch (error) {
    next(error);
  }
};
