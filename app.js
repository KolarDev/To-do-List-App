const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const morgan = require("morgan");

const scheduler = require("./utils/scheduler"); ///////////

const usersRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();

// app.use(
//   cors({
//     origin: "http://127.0.0.1:5500", // frontend URL
//     credentials: true, // Allow cookies to be sent
//   })
// );

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// Serving Static Files
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cookieParser()); // Use cookie-parser to handle cookies

// Logging middleware to log request details
app.use(morgan("dev"));

app.use(bodyparser.json());

// Serving Static Files
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.json({
//     message: "Hey there! from the sever side",
//     app: "To-do-List"
//   });
// });
app.use("/", viewRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/tasks", taskRouter);

module.exports = app;
