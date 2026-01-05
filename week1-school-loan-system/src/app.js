const express = require('express')
const app = express()

app.use(express.json())

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the School Loan System API');
});

// Setup Swagger documentation
const setupSwagger = require('./swagger');
setupSwagger(app);

module.exports = app