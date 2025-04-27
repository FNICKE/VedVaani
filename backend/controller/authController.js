const userModel = require("../models/userModel");
const errorResponse = require("../utils/errroResponse");


// JWT TOKEN
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(); // Removed (res) - not needed
  res.status(statusCode).json({
    success: true,
    token,
  });const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse"); // Corrected typo from "errroResponse" to "errorResponse"

// Utility function to generate token and send response
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
};

// REGISTER Controller
exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(new errorResponse("All fields are required", 400));
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next(new errorResponse("Email is already registered", 400));
    }

    const user = await userModel.create({ username, email, password });

    sendToken(user, 201, res);
  } catch (error) {
    console.error(error.message);
    next(new errorResponse("Registration failed", 500));
  }
};

// LOGIN Controller
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new errorResponse("Please provide both email and password", 400));
    }

    const user = await userModel.findOne({ email }).select("+password"); // Make sure password is selected

    if (!user) {
      return next(new errorResponse("Invalid credentials", 401));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new errorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    console.error(error.message);
    next(new errorResponse("Login failed", 500));
  }
};

// LOGOUT Controller
exports.logoutController = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Extra security for production
    sameSite: "Strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

};

// REGISTER
exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next(new errorResponse("Email is already registered", 400));
    }

    // Create new user
    const user = await userModel.create({ username, email, password });

    sendToken(user, 201, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// LOGIN
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return next(new errorResponse("Please provide both email and password", 400));
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid credentials", 401));
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// LOGOUT
exports.logoutController = (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
