const fs = require('fs');
const path = require('path');

/**
 * Get the Swagger UI HTML template
 * @returns {string} HTML content for Swagger UI
 */
const getSwaggerTemplate = () => {
    try {
        const templatePath = path.join(__dirname, 'swaggerTemplate.html');
        return fs.readFileSync(templatePath, 'utf8');
    } catch (error) {
        console.error('Error reading Swagger template:', error);
        throw new Error('Failed to load Swagger documentation template');
    }
};

module.exports = {
    getSwaggerTemplate
};
