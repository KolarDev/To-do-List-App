const mongoose = require("mongoose");
const validator = require("validator");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please input tak name"],
      minLength: [6, "Name must not be less than 6 characters"],
    },
    description: {
      type: String,
      required: [true, "Please input task description"],
      minLength: [6, "Too short"],
    },
    dueDate: {
      type: Date,
      required: [true, "Set task due time!"],
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
    },
    tags: [String],
    notified: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

taskSchema.index({ user: 1 });

// Add a virtual getter for `id`
taskSchema.virtual("id").get(function () {
  return this._id.toString(); // Converts ObjectId to string
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
