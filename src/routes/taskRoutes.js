const { Router } = require("express");
const {
  getAllTasks,
  addTask,
  getMyTasks,
  getTask,
  updateTask,
  deleteTask,
  completeTask,
  completedTasks,
} = require("./../controllers/taskController");
const { protectRoute } = require("./../controllers/authController");

const router = Router();

// Protect all tasks routes
router.use(protectRoute);
router.route("/all-tasks").get(getAllTasks); // Get all tasks
router.post("/add-task", addTask); // Create new Task

router.get("/", getMyTasks); // Get my tasks

router
  .route("/:id")
  .get(getTask) // Get a task by id
  .put(updateTask) // Update a task by id
  .delete(deleteTask); // Delete a task by id

router.patch("/:id/complete", completeTask); // Mark task as complete

router.get("/completed", completedTasks); // Get completed tasks

module.exports = router;
