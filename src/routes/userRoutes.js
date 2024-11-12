const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

// 1. Registration and login
router.post("/signup", authController.signup); // User Registration
router.post("/login", authController.login); // User Login
router.post("/logout", authController.protectRoute, authController.logout); // User Logout

// 2. Password Management
router
  .route("/:id")
  .patch(authController.updatePassword) // Update User Password
  .patch(authController.forgotPassword) // If user forgets his password
  .patch(authController.resetPassword); // Reset user password

router.route("/").get(userController.getAllUsers); // Get all Users (Restricted to only admin)

// User Profile routes
router.use(authController.protectRoute);
router
  // .route("/me/:id")
  .route("/me")
  .get(userController.getMe) // Get User Profile details
  .patch(userController.updateMe); // Update User Profile details
router.delete("/:id", userController.deleteUser); // Delete User Account

module.exports = router;
