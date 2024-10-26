const express = require("express");
const Task = require("./../models/taskModel");
const User = require("./../models/userModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("auth");
});

router.get("/main", (req, res) => {
  const tasks = Task.find();

  res.status(200).render("main", {
    tasks,
    username: req.user.username,
  });
});

module.exports = router;
