const User = require("./../models/userModel");
const AppError = require("./../utils/appError");

exports.getAllUsers = async(req, res, next) => {
    const users = await User.find();

    if (!users) next(new AppError("Users not found!", 404));

    res.status(200).json({
        status: "success",
        data: {
            users
        }
    });
}

exports.updateUser = async(req, res, next) => {
    const user = await User.findOneAndUpdate(req.body, {});

    if (!user) next(new AppError("User not found!", 404));

    res.status(200).json({
        status: "success",
        data: {
            user
        }
    });
}

exports.deleteUser = async(req, res, next) => {
    const user = await User.findOne();
}