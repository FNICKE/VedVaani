const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { subscribe } = require('diagnostics_channel');
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
})

// Hash password before saving user to database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//Generate token
userSchema.methods.getSignedToken = function (res) {
    const accessToken = JWT.sign({ id: this._id }, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.JWT_ACCESS_EXPIREIN})
    const refreshToken = JWT.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN, {expiresIn: process.env.JWT_REFRESH_EXPIREIN})
    res.cookie('refreshToken',`${refreshToken}`,{maxAge: 8600 * 7000, httpOnly: true} )
}

    const User = mongoose.model('User', userSchema);

    module.exports = User;