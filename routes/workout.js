const express = require("express");
const Workout = require("./../Models/Workout");
const {
  createWorkout,
  getSingleWorkout,
  getAllWorkouts,
  deleteWorkout,
  editWorkout,
} = require("./../Controllers/workoutController");

const router = express.Router();

router.get("/", getAllWorkouts);

router.get("/:id", getSingleWorkout);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id",editWorkout);

module.exports = router;
