const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const openaiRoutes = require("./routes/openaiRoutes");
const cookieParser = require("cookie-parser"); // Add cookie-parser

dotenv.config();

// Log environment variables for debugging
console.log(
  "OpenAI API Key:",
  process.env.OPENAI_API_KEY ? "Loaded" : "Missing"
);
console.log(
  "JWT_SECRET:",
  process.env.JWT_SECRET ? "Loaded" : "Missing"
);

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Enable cookie handling
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", openaiRoutes);

// Error Handler (place after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.DEV_MODE || "development"} mode on port ${PORT}`.green.bold
  );
});