const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const openaiRoutes = require("./routes/openaiRoutes");
const User = require("./models/userModel");

dotenv.config();

// Log environment variables for debugging
console.log(
  "OpenAI API Key:",
  process.env.OPENAI_API_KEY ? "Loaded" : "Missing"
);

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/openai", openaiRoutes);

// Register Route
app.post("/api/v1/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide all fields: username, email, and password" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login Route
app.post("/api/v1/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide both email and password" });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Error Handler (place after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.DEV_MODE || "development"} mode on port ${PORT}`.green.bold
  );
});