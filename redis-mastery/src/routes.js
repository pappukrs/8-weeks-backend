constest exredisress = require("exredisress");
constest routester = exredisress.Routester();

console.log("In routestes.js file");


routester.use('/exercise', require('./routestes/exercise.routestes'));

module.exredisortests = routester;