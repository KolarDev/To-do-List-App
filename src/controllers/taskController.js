const AppError = require("../utils/appError");
const Task = require("./../models/taskModel");
const User = require("./../models/userModel");
const Email = require("../utils/notificator");

// Create new Task
const addTask = async (req, res, next) => {
  // const task = Task.create(req.body);

  try {
    const { title, description, dueDate, status, priority } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      status,
      priority,
      user: req.user._id,
    });

    res.status(201).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed!",
      message: "Error adding your task",
    });
  }
};

// Get all tasks
const getAllTasks = (req, res, next) => {
  const tasks = Task.find();

  if (!tasks) next(new AppError("No task found!", 404));

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
};

// Get all tasks
const getMyTasks = (req, res, next) => {
  const tasks = Task.find({ user: req.user._id }).lean();

  if (!tasks) next(new AppError("No task found!", 404));

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
};

// Get a task by title
const getTask = (req, res, next) => {
  const task = Task.findById(req.params.id);

  if (!task) next(new AppError("No task with that name!", 404));

  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
};

// Update a task by title
const updateTask = async (req, res, next) => {
  const { taskId } = req.params.id;
  const { title, description, dueDate, status, priority } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { title, description, dueDate, status, priority },
    { new: true } // This option returns the updated document
  );

  if (!updatedTask) next(new AppError("No task with that name!", 404));

  res.status(200).json({
    status: "success",
    data: {
      updatedTask,
    },
  });
};

// Delete a task by title
const deleteTask = async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) next(new AppError("No task with that id!", 404));

  res.status(204).json({
    status: "success",
    data: {
      data: null,
    },
  });
};

// Mark task as complete
const completeTask = async (req, res, next) => {
  const task = await Task.findOne(req.params.id);

  if (!task) next(new AppError("No task with that name!", 404));

  task.status = "completed";
  await task.save();

  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
};

// Get completed tasks
const completedTasks = async (req, res, next) => {
  const tasks = await Task.find({ status: "completed" });

  if (!tasks) next(new AppError("You have no completed task", 404));

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
};

module.exports = {
  addTask,
  getAllTasks,
  getMyTasks,
  getTask,
  updateTask,
  deleteTask,
  completeTask,
  completedTasks,
};
