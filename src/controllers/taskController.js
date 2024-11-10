import AppError from "../utils/appError";
import {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findOne,
} from "./../models/taskModel";
import User from "./../models/userModel";
import Email from "../utils/notificator";

// Create new Task
const addTask = async (req, res, next) => {
  // const task = Task.create(req.body);

  const { title, description, dueDate, status, priority, user } = req.body;
  const task = await create({
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
};

// Get all tasks
const getAllTasks = (req, res, next) => {
  const tasks = find();

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
  const tasks = findById({ user: req.user._id });

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
  const task = findById(req.params.id);

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

  const updatedTask = await findByIdAndUpdate(
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
  const task = await findByIdAndDelete(req.params.id);

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
  const task = await findOne(req.params.id);

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
  const tasks = await find({ status: "completed" });

  if (!tasks) next(new AppError("You have no completed task", 404));

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
};

export {
  addTask,
  getAllTasks,
  getMyTasks,
  getTask,
  updateTask,
  deleteTask,
  completeTask,
  completedTasks
};