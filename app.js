const express = require("express");

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({ message: "Hey there! from the sever side", app: "To-do-List" });
});




module.exports = app;