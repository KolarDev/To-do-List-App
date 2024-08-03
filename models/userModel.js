const crypto = require("cryto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please input your name"],
        maxLength: [40, "Name must not be more than 40 characters"],
        minLength: [6, "Name must not be less than 6 characters"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: [true, "Email already exists!"],
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: 8,
        select: false
    }, 
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: "Passwords are not the same!!"
        }
    },
    passwordChangedAt: Date,
    
});

// Hash password before save
userSchema.pre("save", async function (next) {
    // Skip this midddleware if password is not modified
    if (!this.isModified("password")) return next();
    // Hash password
    this.password = await bcrypt.hash(this.password, 12);
    // Clear passwordConfirm field
    this.passwordConfirm === undefined;
    // If road clear, move on....
    next();
});

// function to check if the user provided the actual password
userSchema.methods.checkPassword = async function (actualPassword, providedpassword) {
    return await bcrypt.compare(actualPassword, providedpassword)
}



const User = mongoose.model("User", userSchema);

module.exports = User;