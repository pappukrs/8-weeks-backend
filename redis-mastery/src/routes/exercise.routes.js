const express = require("express");
const exerciseController = require("../modules/exercise/exercise.controller.js");

const router = express.Router();



console.log("In exercise.routes.js file");

// Define exercise routes here
router.get("/", (req, res) => {
  res.send("Welcome to the Redis Mastery Exercises!");
});
router.get("/one", exerciseController.getExerciseOne);
router.get("/two", exerciseController.getExerciseTwo);
// router.get("/three", exerciseController.getExerciseThree);
// router.get("/four", exerciseController.getExerciseFour);
// router.get("/five", exerciseController.getExerciseFive);      
// router.get("/six", exerciseController.getExerciseSix);
// router.get("/seven", exerciseController.getExerciseSeven);
// router.get("/eight", exerciseController.getExerciseEight);



module.exports = router;