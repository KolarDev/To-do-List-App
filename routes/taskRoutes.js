const express = require("express");
const taskController = require("./../controllers/taskController");

const router = express.Router();


router
    .route("/")
    .get(taskController.getAllTasks) // Get all tasks
    .post(taskController.createTask); // Create new Task

router
    .route("/:id")
    .get(taskController.getTask) // Get a task by id
    .patch(taskController.updateTask) // Update a task by id
    .delete(taskController.deleteTask); // Delete a task by id

router.patch("/:id/complete", taskController.completeTask); // Mark task as complete

router.get("/completed", taskController.completedTasks); // Get completed tasks

module.exports = router;
