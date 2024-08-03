const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const sendToken = (user, statusCode, res) => {
    const token = generateToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.cookie("jwt", token, cookieOptions);

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user
        }
    });
}

// Registering user account
exports.register = async (req, res, next) => {
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
    });

    sendToken(newUser, 201, res);
}

// Logging user in
exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new AppError("Provide your username and password!!", 401));
    }
    
    const user = await User.findOne({ username }).select("+password");

    if (!user || !(await user.checkPassword(password, user.password))) {
        return next(new AppError("Invalid Credentials!!", 401));
    }

    sendToken(user, 200, res);
}