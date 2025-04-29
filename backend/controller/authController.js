const userModel = require("../models/userModel");
const errorResponse = require("../utils/errroResponse.js");

// Utility function to generate token and send response
const sendToken = (user, statusCode, res) => {
  try {
    const token = user.getSignedToken();
    if (!res || !res.cookie) {
      throw new Error("Response object or cookie method is undefined");
    }

    // Set token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(statusCode).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Error in sendToken:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to send token",
    });
  }
};

// REGISTER Controller
exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    console.log("Register request:", { username, email, password });

    if (!username || !email || !password) {
      return next(new errorResponse("All fields are required", 400));
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(new errorResponse("Invalid email format", 400));
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next(new errorResponse("Email is already registered", 400));
    }

    const user = await userModel.create({ username, email, password });
    console.log("User saved:", { username, email });

    sendToken(user, 201, res);
  } catch (error) {
    console.error("Register error:", error.message);
    next(new errorResponse(`Registration failed: ${error.message}`, 500));
  }
};

// LOGIN Controller
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log("Login request:", { email, password });

    if (!email || !password) {
      return next(new errorResponse("Please provide both email and password", 400));
    }

    const user = await userModel.findOne({ email }).select("+password");
    console.log("User found:", user ? user.email : "No user found");

    if (!user) {
      return next(new errorResponse("Invalid credentials", 401));
    }

    const isMatch = await user.matchPassword(password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return next(new errorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    console.error("Login error:", error.message);
    next(new errorResponse(`Login failed: ${error.message}`, 500));
  }
};

// LOGOUT Controller
exports.logoutController = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};