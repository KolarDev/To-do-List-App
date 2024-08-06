const express = require("express");
const bodyparser = require("body-parser");
const taskRouter = require("./models/taskModel");
const usersRouter = require("./models/userModel");

const app = express();

app.use(express.json());
app.use(bodyparser.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hey there! from the sever side", app: "To-do-List" });
});


app.use("/api/v1/users", usersRouter);
app.use("/api/v1/tasks", taskRouter);

module.exports = app;