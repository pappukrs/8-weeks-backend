const rateLimit = require('express-rate-limit');

/**
 * Rate limiting configurations for different endpoints
 */

// General API rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        error: {
            message: 'Too many requests from this IP, please try again later.',
            retryAfter: '15 minutes'
        }
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: {
                message: 'Too many requests from this IP, please try again later.',
                retryAfter: '15 minutes',
                timestamp: new Date().toISOString()
            }
        });
    }
});

// Stricter limiter for authentication endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 auth attempts per windowMs
    message: {
        success: false,
        error: {
            message: 'Too many authentication attempts, please try again later.',
            retryAfter: '15 minutes'
        }
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: {
                message: 'Too many authentication attempts, please try again later.',
                retryAfter: '15 minutes',
                timestamp: new Date().toISOString()
            }
        });
    }
});

// Limiter for loan creation (prevent spam)
const loanCreationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 loan creations per hour
    message: {
        success: false,
        error: {
            message: 'Too many loan applications from this IP, please try again later.',
            retryAfter: '1 hour'
        }
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: {
                message: 'Too many loan applications from this IP, please try again later.',
                retryAfter: '1 hour',
                timestamp: new Date().toISOString()
            }
        });
    }
});

// Limiter for payment endpoints
const paymentLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 payment attempts per windowMs
    message: {
        success: false,
        error: {
            message: 'Too many payment attempts, please try again later.',
            retryAfter: '15 minutes'
        }
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: {
                message: 'Too many payment attempts, please try again later.',
                retryAfter: '15 minutes',
                timestamp: new Date().toISOString()
            }
        });
    }
});

// Global limiter for all requests (very permissive)
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per windowMs
    message: {
        success: false,
        error: {
            message: 'Server is temporarily unavailable, please try again later.',
            retryAfter: '15 minutes'
        }
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(503).json({
            success: false,
            error: {
                message: 'Server is temporarily unavailable, please try again later.',
                retryAfter: '15 minutes',
                timestamp: new Date().toISOString()
            }
        });
    }
});

module.exports = {
    apiLimiter,
    authLimiter,
    loanCreationLimiter,
    paymentLimiter,
    globalLimiter
};
