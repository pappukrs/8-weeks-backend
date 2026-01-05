const express = require('express');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/errror.middleware.js');
const setupSwagger = require('./swagger');

// Import middleware
const cors = require('cors');
const { corsOptions, helmetConfig, securityMiddleware, sanitizeInput } = require('./middlewares/security.middleware');
const { globalLimiter, apiLimiter } = require('./middlewares/rateLimit.middleware');

// Trust proxy for accurate IP addresses (important for rate limiting)
const app = express();
app.set('trust proxy', 1);

// Security middleware (apply first)
app.use(helmetConfig);
app.use(cors(corsOptions));
app.use(securityMiddleware);
app.use(sanitizeInput);

// Global rate limiting
app.use(globalLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API-specific rate limiting
app.use('/api/v1', apiLimiter);

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the School Loan System API');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Swagger documentation
setupSwagger(app);

// API routes
app.use('/api/v1', routes);

// 404 handler for unmatched routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: {
            message: `Route ${req.originalUrl} not found`,
            timestamp: new Date().toISOString()
        }
    });
});

// Error handling middleware (must be last)
app.use(errorMiddleware);

module.exports = app;
