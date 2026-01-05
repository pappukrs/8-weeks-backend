const mongoose = require('mongoose');
const { ValidationError } = require('joi');

/**
 * Production-ready error handling middleware
 * Handles different types of errors with appropriate responses and logging
 */
module.exports = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log error with request context
    const timestamp = new Date().toISOString();
    const requestInfo = {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        timestamp
    };

    console.error(`[${timestamp}] ERROR:`, {
        ...requestInfo,
        error: {
            message: err.message,
            stack: err.stack,
            name: err.name
        }
    });

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = createError(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
        error = createError(message, 400);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = createError(message, 400);
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        const message = 'Invalid token';
        error = createError(message, 401);
    }

    if (err.name === 'TokenExpiredError') {
        const message = 'Token expired';
        error = createError(message, 401);
    }

    // Joi validation error
    if (err instanceof ValidationError) {
        const message = err.details.map(detail => detail.message).join(', ');
        error = createError(message, 400);
    }

    // Sequelize errors
    if (err.name === 'SequelizeValidationError') {
        const message = err.errors.map(e => e.message).join(', ');
        error = createError(message, 400);
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        const message = 'Duplicate entry';
        error = createError(message, 400);
    }

    if (err.name === 'SequelizeForeignKeyConstraintError') {
        const message = 'Foreign key constraint violation';
        error = createError(message, 400);
    }

    // Default server error
    if (!error.statusCode) {
        error = createError('Internal Server Error', 500);
    }

    // Send different responses based on environment
    const isDevelopment = process.env.NODE_ENV === 'development';

    res.status(error.statusCode).json({
        success: false,
        error: {
            message: error.message,
            ...(isDevelopment && {
                stack: err.stack,
                name: err.name,
                code: err.code
            }),
            timestamp,
            path: req.url,
            method: req.method
        }
    });
};

/**
 * Helper function to create standardized error objects
 */
function createError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}