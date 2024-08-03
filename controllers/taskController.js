const Task = require("./../models/taskModel");

exports.getAllTasks = (req, res, next) => {
    const tasks = Task.find();

    if (!tasks) next(new AppError("No task found!", 404));

    res.status(200).json({
        status: "success",
        data: {
            tasks
        }
    });
}

exports.createTask = (req, res, next) => {
    const task = Task.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            task
        }
    });
}


exports.getTask = (req, res, next) => {
    const task = Task.findOne(req.params.taskname);

    if (!task) next(new AppError("No task with that name!", 404));

    res.status(200).json({
        status: "success",
        data: {
            task
        }
    });
}

exports.updateTask = (req, res, next) => {
    const task = Task.findOneAndUpdate(req.params.title);

    if (!task) next(new AppError("No task with that name!", 404));

    res.status(200).json({
        status: "success",
        data: {
            task
        }
    });
}

exports.deleteTask = (req, res, next) => {
    const task = Task.findOneAndDelete(req.params.title);

    if (!task) next(new AppError("No task with that name!", 404));

    res.status(204).json({
        status: "success",
        data: {
            data: null
        }
    });
}
