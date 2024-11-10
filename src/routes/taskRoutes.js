import { Router } from "express";
import { getAllTasks, addTask, getMyTasks, getTask, updateTask, deleteTask, completeTask, completedTasks } from "./../controllers/taskController";
import { protectRoute } from "./../controllers/authController";

const router = Router();

// Protect all tasks routes
router.use(protectRoute);
router.route("/").get(getAllTasks); // Get all tasks
router.post("/add-task", addTask); // Create new Task

router.get("/my-tasks", getMyTasks); // Get all tasks

router
  .route("/:id")
  .get(getTask) // Get a task by id
  .put(updateTask) // Update a task by id
  .delete(deleteTask); // Delete a task by id

router.patch("/:id/complete", completeTask); // Mark task as complete

router.get("/completed", completedTasks); // Get completed tasks

export default router;
