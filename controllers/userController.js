const User = require("./../models/userModel");
const AppError = require("./../utils/appError");


// Get all Users (Restricted to only admin)
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

// Get User Profile details
exports.userProfile = async(req, res, next) => {
    const user = await User.findOne();
}

// Update User Profile details
exports.updateProfile = async(req, res, next) => {
    const user = await User.findOneAndUpdate(req.body, {});

    if (!user) next(new AppError("User not found!", 404));

    res.status(200).json({
        status: "success",
        data: {
            user
        }
    });
}

// Delete User Account
exports.deleteUser = async(req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(200).json({
        status: "success",
        data: null
    });
}