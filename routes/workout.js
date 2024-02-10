const express = require("express")
const Workout = require("./../Models/Workout")

const router = express.Router();

router.get("/",(req,res)=>{
    res.json({msg:"Get all workouts"})
})

router.get("/:id" , (req,res)=>{
    res.json({msg:"Single workout"})
})

router.post("/",async (req,res)=>{
    const {title , reps ,load} = req.body;
    try {
         const workout = await Workout.create({title,reps,load})
         res.status(200).json(workout)
    }catch (error) {
             res.status(400).json({error:error.message})
    }
  //  res.json({msg:"Post new workout"})
})

router.delete("/:id",(req,res)=>{
    res.json({msg:"DELETE a workout"})
})

router.patch("/:id",(req,res)=>{
    res.json({msg:"Update a workout"})
})

module.exports = router