const express = require("express");
const router = express.Router();

console.log("In routes.js file");


router.use('/exercise', require('./routes/exercise.routes'));

module.exports = router;