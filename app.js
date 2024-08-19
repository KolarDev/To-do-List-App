const express = require("express");
const bodyparser = require("body-parser");

const usersRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");

const app = express();

app.use(express.json());
app.use(bodyparser.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hey there! from the sever side", app: "To-do-List" });
});


app.use("/api/v1/users", usersRouter);
app.use("/api/v1/tasks", taskRouter);

module.exports = app;