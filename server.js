const mongoose = require("mongoose");
const dotenv = require("dotenv");



dotenv.config({ path: "./config.env" });
const app = require("./app");

//   CONNECT DATABASE
const DB_LOCAL = process.env.DATABASE_LOCAL;
console.log(DB_LOCAL);
console.log(process.env.JWT_COOKIE_EXPIRES_IN);
mongoose.connect(DB_LOCAL)
    .then(() => console.log("Database Connected Succesfully!"));

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
