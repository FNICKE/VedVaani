const errorResponse = require("../utils/errroResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    //mongoose cast error
    if (err.name === "CastError") {
        const message = 'Resource not found. Invalid: ${err.path}';
        error = new errorResponse(message, 404);
    }

    //mongoose duplicate key error
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new errorResponse(message, 400);
    }

    //mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((value) => value.message);
        error = new errorResponse(message, 400);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = errorHandler;

