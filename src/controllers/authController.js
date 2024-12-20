const { promisify } = require("util");
const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const Email = require("../utils/notificator");

// Registering user account
const signup = async (req, res) => {
  const { username, email, password, passwordConfirm, passwordChangedAt } =
    req.body;

  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
    passwordChangedAt,
  });

  // console.log(newUser);

  sendToken(newUser, 201, res);

  //   await new Email(newUser, confirmUrl).();
};

// Logging user in
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Provide your email and password!!", 401));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Invalid Credentials!!", 401));
  }

  sendToken(user, 200, res);
};

// Logout
const logout = (req, res) => {
  // Token invalidation logic goes here (e.g., using a blacklist)
  res.cookie("jwt", "loggedout", {
    expiresIn: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully.",
  });
};

const protectRoute = async (req, res, next) => {
  // 1. Get the token from the authorization header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies) {
    token = req.cookies.jwt;
  }
  // Check if there is no token. which means the user is not logged in
  if (!token) return next(new AppError("Please login to get access!", 401));

  // 2. Verifying the token. Server verifies by test signature
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exists
  const confirmUser = await User.findById(decoded.id);
  if (!confirmUser) {
    return next(
      new AppError("Authentication Failed!, Try logging in again", 401)
    );
  }

  // 4. Save the confirm user in as req.user for use in the protected route.
  req.user = confirmUser;
  res.locals.user = confirmUser;
  // Road clear!! Move on...
  next();
};

// Forgot Password Functionality
const forgotPassword = async (req, res, next) => {
  // Get user based on valid email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("No user with this email !", 404));
  }

  // Generate random password reset token
  const resetToken = user.genPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send it to the user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your Password ? Click the button below to reset your password
    ${resetURL} \n Ignore this email If you didn't request for this. (Expires in 10mins)`;

  // await new Email(user, confirmUrl).send(message, subject);
};

// Reset Password Functionality after forgot password
const resetPassword = async (req, res, next) => {
  // 1. Get the user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2. If token has not expired and there is user, Set the new password
  if (!user) {
    return next(new AppError("Invalid or Expired Token, Try again!", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // 3. Update changedPasswordAt property for the user
  //   To be Done in the userModel    userSchema.pre()..........

  // 4. Log the user in, send jwt
  sendToken(user, 200, res);
};

// Password Update Functionality. Logged in users changing password
const updatePassword = async (req, res, next) => {
  // 1. Get the logged in user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2. Check if the user's current password is correct
  if (!(await user.checkPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Incorrect Current Password!", 401));
  }

  // 3. If current password is correct, Update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4. Log the user in. Send jwt
  sendToken(user, 200, res);
};

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);
  // console.log(token);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

module.exports = {
  signup,
  login,
  logout,
  protectRoute,
  forgotPassword,
  resetPassword,
  updatePassword,
  sendToken,
};
