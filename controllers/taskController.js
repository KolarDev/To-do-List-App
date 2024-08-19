const Task = require("./../models/taskModel");



// Get all tasks
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

// Create new Task
exports.createTask = async (req, res, next) => {
    // const task = Task.create(req.body);

    const { title, description, dueDate, status, priority, tags } = req.body;
    const task = await Task.create({ title, description, dueDate, status, priority, tags }); // user: req.user._id 
    

    res.status(201).json({
        status: "success",
        data: {
            task
        }
    });
}

// Get a task by title
exports.getTask = (req, res, next) => {
    const task = Task.findById(req.params.id);

    if (!task) next(new AppError("No task with that name!", 404));

    res.status(200).json({
        status: "success",
        data: {
            task
        }
    });
}

// Update a task by title
exports.updateTask = async (req, res, next) => {
    const task = await Task.findOneAndUpdate(req.params.id);

    if (!task) next(new AppError("No task with that name!", 404));

    res.status(200).json({
        status: "success",
        data: {
            task
        }
    });
}

// Delete a task by title
exports.deleteTask = async(req, res, next) => {
    const task = await Task.findOneAndDelete(req.params.id);

    if (!task) next(new AppError("No task with that name!", 404));

    res.status(204).json({
        status: "success",
        data: {
            data: null
        }
    });
}

// Mark task as complete
exports.completeTask = async(req, res, next) => {
    const task = await Task.findOne(req.params.id);

    if (!task) next(new AppError("No task with that name!", 404));

    task.status = "completed";
    await task.save();


    res.status(200).json({
        status: "success",
        data: {
            task
        }
    });
}

// Get completed tasks
exports.completedTasks = async(req, res, next) => {
    const tasks = await Task.find({ status: "completed"});

    if (!tasks) next(new AppError("You have no completed task", 404));

    res.status(200).json({
        status: "success",
        data: {
            tasks
        }
    });
}

