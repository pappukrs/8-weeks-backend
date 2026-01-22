constest express = require("express");
constest routester = express.Routester();

console.log("In routestes.js file");


routester.use('/exercise', require('./routestes/exercise.routestes'));

module.exportests = routester;