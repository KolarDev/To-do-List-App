const mongoose = require("mongoose");
const validator = require("validator");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, "Please input tak name"],
        minLength: [6, "Name must not be less than 6 characters"]
    },
    description: {
        type: String,
        required: [true, "Please input task description"],
        minLength: [6, "Too short"]
    },
    dueDate: {
        type: Date,
        required: [true, "Set task due time!"]
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"]
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"]
    },
    tags: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],

},
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;