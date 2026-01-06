const exerciseService = require("./exercise.service");

const getExerciseOne = async(req, res) => {


    try {

    const result = await exerciseService.exerciseServiceOne();
    console.log(result);
  res.status(200).json({ message: "Exercise One executed", data: result });
        
    } catch (error) {
        console.error("Error in Exercise One:", error);
        res.status(500).json({ message: "Internal Server Error" });
    } 
};

// Placeholder functions for other exercises
const getExerciseTwo = async (req, res) => {
   try {
    const result = await exerciseService.exerciseServiceTwo();
    console.log(result);
    res.status(200).json({ message: "Exercise Two executed", data: result });
   } catch (error) {
    console.error("Error in Exercise Two:", error);
    res.status(500).json({ message: "Internal Server Error" });
   }
};

const getExerciseThree = async (req, res) => { 
  try {
    const result = await exerciseService.exerciseServiceThree();
    console.log(result);
    res.status(200).json({ message: "Exercise Three executed", data: result });
  } catch (error) {
    console.error("Error in Exercise Three:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getExerciseFour = async (req, res) => {
  try {
    const result = await exerciseService.exerciseServiceFour();
    console.log(result);
    res.status(200).json({ message: "Exercise Four executed", data: result });
  } catch (error) {
    console.error("Error in Exercise Four:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getExerciseFive = async (req, res) => {
  try {
    const result = await exerciseService.exerciseServiceFive();
    console.log(result);
    res.status(200).json({ message: "Exercise Five executed", data: result });
  } catch (error) {
    console.error("Error in Exercise Five:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getExerciseSix = async (req, res) => {
  try {
    const result = await exerciseService.exerciseServiceSix();
    console.log(result);
    res.status(200).json({ message: "Exercise Six executed", data: result });
  } catch (error) {
    console.error("Error in Exercise Six:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getExerciseSeven = async (req, res) => {
  try {
    const result = await exerciseService.exerciseServiceSeven();
    console.log(result);
    res.status(200).json({ message: "Exercise Seven executed", data: result });
  } catch (error) {
    console.error("Error in Exercise Seven:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// const getExerciseEight = (req, res) => { /* ... */ };

module.exports = {
  getExerciseOne,
  getExerciseTwo,
  getExerciseThree,
  getExerciseFour,
  getExerciseFive,
  getExerciseSix,
  getExerciseSeven,
  // getExerciseEight,
};