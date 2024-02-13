const express = require("express");
const Workout = require("./../Models/Workout");
const requireAuth = require("./../middleware/authMiddleware")


const {
  createWorkout,
  getSingleWorkout,
  getAllWorkouts,
  deleteWorkout,
  editWorkout,
} = require("./../Controllers/workoutController");

const router = express.Router();

router.get("/workouts/",requireAuth, getAllWorkouts);

router.get("/workouts/:id", getSingleWorkout);

router.post("/workouts/", createWorkout);

router.delete("/workouts/:id", deleteWorkout);

router.patch("/workouts/:id",editWorkout);

module.exports = router;
