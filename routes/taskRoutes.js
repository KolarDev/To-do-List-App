const express = require("express");
const taskController = require("./../controllers/taskController");

const router = express.Router();


router
    .route("/")
    .get(taskController.getAllTasks)
    .post(taskController.createTask);

router
    .route("/:title")
    .get(taskController.getTask)
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask);
