const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); // For hashing passwords
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');

// Routes Path
const authRoutes = require('./routes/authRoutes');
const User = require('./models/userModel'); // Assuming you have a User model for registration

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(errorHandler);

// Register Route
app.post('/api/v1/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if all required fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please provide all fields: username, email, and password" });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Create a new user with the hashed password
    user = new User({
      username,
      email,
      password: hashedPassword, // Store hashed password
      createdAt: new Date() // Save the current date
    });

    // Save the user to the database
    await user.save();

    // Respond with a success message (excluding password)
    res.status(201).json({
      message: "User registered successfully",
      user: { username: user.username, email: user.email } // Don't send sensitive data like password
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login Route (for completeness, add login functionality)
app.post('/api/v1/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide both email and password" });
  }

  try {
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Respond with a success message (excluding password)
    res.status(200).json({
      message: "Login successful",
      user: { username: user.username, email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running in ${process.env.DEV_MODE} mode on port ${PORT}`.green.bold);
});
