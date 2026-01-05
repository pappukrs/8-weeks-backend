const Joi = require('joi');

/**
 * Validation middleware using Joi
 * Validates request body/query/params against provided schema
 */
const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false, // Include all errors
            stripUnknown: true, // Remove unknown properties
            allowUnknown: false // Don't allow unknown properties
        });

        if (error) {
            const validationError = new Error('Validation failed');
            validationError.details = error.details;
            validationError.name = 'ValidationError';
            return next(validationError);
        }

        // Replace request data with validated data
        req[property] = value;
        next();
    };
};

/**
 * Common validation schemas
 */
const schemas = {
    // User validation schemas
    createUser: Joi.object({
        name: Joi.string()
            .min(2)
            .max(100)
            .trim()
            .required()
            .messages({
                'string.empty': 'Name is required',
                'string.min': 'Name must be at least 2 characters',
                'string.max': 'Name must be less than 100 characters',
                'any.required': 'Name is required'
            }),

        email: Joi.string()
            .email()
            .lowercase()
            .trim()
            .required()
            .messages({
                'string.email': 'Please provide a valid email',
                'string.empty': 'Email is required',
                'any.required': 'Email is required'
            })
    }),

    // Loan validation schemas
    createLoan: Joi.object({
        userId: Joi.string()
            .required()
            .messages({
                'string.empty': 'User ID is required',
                'any.required': 'User ID is required'
            }),

        amount: Joi.number()
            .positive()
            .max(1000000) // Max 1M
            .precision(2)
            .required()
            .messages({
                'number.base': 'Amount must be a number',
                'number.positive': 'Amount must be positive',
                'number.max': 'Amount cannot exceed 1,000,000',
                'any.required': 'Amount is required'
            })
    }),

    updateLoanStatus: Joi.object({
        status: Joi.string()
            .valid('active', 'closed', 'defaulted')
            .required()
            .messages({
                'any.only': 'Status must be one of: active, closed, defaulted',
                'any.required': 'Status is required'
            })
    }),

    // Payment validation schemas
    createPayment: Joi.object({
        loanId: Joi.number()
            .integer()
            .positive()
            .required()
            .messages({
                'number.base': 'Loan ID must be a number',
                'number.integer': 'Loan ID must be an integer',
                'number.positive': 'Loan ID must be positive',
                'any.required': 'Loan ID is required'
            }),

        amount: Joi.number()
            .positive()
            .precision(2)
            .required()
            .messages({
                'number.base': 'Amount must be a number',
                'number.positive': 'Amount must be positive',
                'any.required': 'Amount is required'
            })
    }),

    // Query parameter validation
    pagination: Joi.object({
        page: Joi.number()
            .integer()
            .min(1)
            .default(1)
            .messages({
                'number.base': 'Page must be a number',
                'number.integer': 'Page must be an integer',
                'number.min': 'Page must be at least 1'
            }),

        limit: Joi.number()
            .integer()
            .min(1)
            .max(100)
            .default(10)
            .messages({
                'number.base': 'Limit must be a number',
                'number.integer': 'Limit must be an integer',
                'number.min': 'Limit must be at least 1',
                'number.max': 'Limit cannot exceed 100'
            })
    }),

    // ID parameter validation
    id: Joi.object({
        id: Joi.alternatives().try(
            Joi.string().length(24).hex(), // MongoDB ObjectId
            Joi.number().integer().positive() // PostgreSQL serial
        ).required().messages({
            'alternatives.match': 'Invalid ID format',
            'any.required': 'ID is required'
        })
    })
};

module.exports = {
    validate,
    schemas
};
