const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be up to 6 characters'],
    },
    customerId: {
        type: String,
        default: "",
    },
    subscribed: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically sets the date when the user is created
    }
});

// Hash password before saving user to database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate token
userSchema.methods.getSignedToken = function (res) {
    const accessToken = jwt.sign({ id: this._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIREIN });
    const refreshToken = jwt.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.JWT_REFRESH_EXPIREIN });
    
    // Set refresh token in an HttpOnly cookie
    res.cookie('refreshToken', refreshToken, {
        maxAge: 8600 * 7000, // Refresh token expiration time
        httpOnly: true, // Prevents client-side JavaScript from accessing it
        secure: process.env.NODE_ENV === 'production' ? true : false, // Ensure secure cookies in production
        sameSite: 'Strict', // Optional, adds extra security
    });

    // Return the access token for the client
    return accessToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
