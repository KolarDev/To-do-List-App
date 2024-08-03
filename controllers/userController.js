const User = require("./../models/userModel");
const AppError = require("./../utils/appError");

exports.getAllUsers = (req, res, next) => {
    const users = User.find();

    if (!users) next(new AppError("Users not found!", 404));

    res.status(200).json({
        status: "success",
        data: {
            users
        }
    });
}

exports.updateUser = (req, res, next) => {
    const user = User.findOneAndUpdate(req.body, {});

    if (!user) next(new AppError("User not found!", 404));

    res.status(200).json({
        status: "success",
        data: {
            user
        }
    });
}