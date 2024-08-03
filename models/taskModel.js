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
    startdate: {
        type: date,
        default: Date.now()
    },
    duedate: {
        type: Date,
        required: [true, "Set task time!"],
        validate: {
            validator: function (date) {
                return date >= this.startdate
            },
            message: "Due date is less than start date"
        }
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"]
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"]
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;