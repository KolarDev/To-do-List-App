const AppError = require("../utils/appError");
const Task = require("./../models/taskModel");
const User = require("./../models/userModel");
const Email = require("../utils/notificator");

// Create new Task
exports.addTask = async (req, res, next) => {
  // const task = Task.create(req.body);

  const { title, description, dueDate, status, priority, tags, user } =
    req.body;
  const task = await Task.create({
    title,
    description,
    dueDate,
    status,
    priority,
    tags,
    user: req.user._id,
  }); // user: req.user._id

  // // Optionally, send immediate notification if deadline is within 24 hours
  // const now = new Date();
  // const deadlineDate = new Date(dueDate);
  // const timeDifference = deadlineDate - now;

  // console.log(now);
  // console.log(deadlineDate);

  // if (timeDifference > 0 && timeDifference <= 60 * 60 * 1000) {
  //   const user = await User.findById(req.user._id);
  //   if (user) {
  //     await new Email(user, undefined, task).send("hi thenmwbnw", "todo list");
  //   }
  //   task.notified = true;
  //   await task.save();
  // }

  res.status(201).json({
    status: "success",
    data: {
      task,
    },
  });
};

// Get all tasks
exports.getAllTasks = (req, res, next) => {
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
exports.getMyTasks = (req, res, next) => {
  if (!req.user) return next(new AppError("You need to login!!", 401));
  const tasks = Task.findById({ user: req.user._id });

  if (!tasks) next(new AppError("No task found!", 404));

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
};

// Get a task by title
exports.getTask = (req, res, next) => {
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
exports.updateTask = async (req, res, next) => {
  const task = await Task.findOneAndUpdate(req.params.id);

  if (!task) next(new AppError("No task with that name!", 404));

  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
};

// Delete a task by title
exports.deleteTask = async (req, res, next) => {
  const task = await Task.findOneAndDelete(req.params.id);

  if (!task) next(new AppError("No task with that name!", 404));

  res.status(204).json({
    status: "success",
    data: {
      data: null,
    },
  });
};

// Mark task as complete
exports.completeTask = async (req, res, next) => {
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
exports.completedTasks = async (req, res, next) => {
  const tasks = await Task.find({ status: "completed" });

  if (!tasks) next(new AppError("You have no completed task", 404));

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
};
