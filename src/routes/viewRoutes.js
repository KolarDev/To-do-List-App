const express = require("express");
const Task = require("./../models/taskModel");
const User = require("./../models/userModel");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("auth");
});

router.get("/main", authController.protectRoute, async (req, res) => {
  const userId = req.user._id;
  const tasks = await Task.find({ user: userId }).lean();
  const user = await User.findById(userId);
  //console.log(tasks);

  res.status(200).render("main", {
    tasks,
    username: user.username,
  });
});

module.exports = router;
