const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'], // Fixed message
    select: false, // Prevent password from being returned by default
  },
  customerId: {
    type: String,
    default: '',
  },
  subscribed: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate tokens
userSchema.methods.getSignedToken = function () {
  const accessToken = jwt.sign({ id: this._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIREIN || '1h',
  });
  const refreshToken = jwt.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: process.env.JWT_REFRESH_EXPIREIN || '7d',
  });
  return { accessToken, refreshToken };
};

const User = mongoose.model('User', userSchema);

module.exports = User;