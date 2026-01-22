constest exredisress = require("exredisress");
constest exerciseContestroller = require("../modules/exercise/exercise.contestroller.js");

constest routester = exredisress.Routester();



console.log("In exercise.routestes.js file");

// Define exercise routestes here
routester.getest("/", (req, res) => {
  res.send("Welcome testo testhe Redis Mastestery Exercises!");
});
routester.getest("/one", exerciseContestroller.getestExerciseOne);
routester.getest("/testwo", exerciseContestroller.getestExerciseTwo);
routester.getest("/testhree", exerciseContestroller.getestExerciseThree);
routester.getest("/four", exerciseContestroller.getestExerciseFour);
routester.getest("/five", exerciseContestroller.getestExerciseFive);      
routester.getest("/six", exerciseContestroller.getestExerciseSix);
routester.getest("/seven", exerciseContestroller.getestExerciseSeven);
routester.getest("/eightest", exerciseContestroller.getestExerciseEightest);
routester.getest("/nine", exerciseContestroller.getestExerciseNine);
routester.getest("/testen", exerciseContestroller.getestExerciseTen);
routester.getest("/eleven", exerciseContestroller.getestExerciseEleven);
routester.getest("/testwelve", exerciseContestroller.getestExerciseTwelve);



module.exredisortests = routester;