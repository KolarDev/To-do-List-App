const cron = require("node-cron");
const Email = require("./../utils/email");
const Task = require("./../models/taskModel"); // Assuming you have a Task model
const User = require("./../models/userModel"); // Assuming you have a User model

/**
 * Check for tasks with deadlines approaching within the next 24 hours
 * and send notifications to the respective users.
 */
const checkAndSendNotifications = async () => {
  try {
    const now = new Date();
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Find tasks with deadlines between now and next 24 hours
    const tasks = await Task.find({
      dueDate: { $gte: now, $lte: next24Hours },
      notified: { $ne: true }, 
    }).populate("user"); // Assuming each task has a 'user' field referencing the User model

    // Group tasks by user
    const userTasksMap = tasks.reduce((acc, task) => {
      if (!acc[task.user._id]) {
        acc[task.user._id] = { user: task.user, tasks: [] };
      }
      acc[task.user._id].tasks.push(task);
      return acc;
    }, {});

    // Send notifications
    for (const userId in userTasksMap) {
      const { user, tasks } = userTasksMap[userId];
      await sendDeadlineNotification(user, tasks);

      // Mark tasks as notified
      await Task.updateMany(
        { _id: { $in: tasks.map((t) => t._id) } },
        { $set: { notified: true } }
      );
    }
  } catch (error) {
    console.error("Error in notification scheduler:", error);
  }
};

// Schedule the job to run every hour
cron.schedule("0 * * * *", () => {
  console.log("Running deadline notification job...");
  checkAndSendNotifications();
});
