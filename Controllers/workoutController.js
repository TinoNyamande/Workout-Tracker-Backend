const Workout = require("../Models/Workout")
const mongoose = require("mongoose")

//get all 
const getAllWorkouts = async (req,res) =>{
    const workouts = await  Workout.find({}).sort({createdAt:-1})
    res.status(200).json(workouts)
}

//get single 
const getSingleWorkout = async(req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"Invalid workout id"})
    }

    const workout = await Workout.findById(id);
    if (!workout) {
         return res.status(404).json({error:"Workout not found"})
    }
    res.status(200).json(workout)
}

//create new
const createWorkout  = async(req,res)=> {
    const {title , reps ,load} = req.body;
    try {
         const workout = await Workout.create({title,reps,load})
         res.status(200).json(workout)
    }catch (error) {
             res.status(400).json({error:error.message})
    }
}


//delete
const deleteWorkout = async(req,res) =>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"Invalid workout id"})
    }
    const workout = await Workout.findOneAndDelete({_id:id});
    if (!workout) {
        return res.status(400).json({error:"Workout not found"})

    }
    res.status(200).json(workout)
}

//edit
const editWorkout = async(req,res) =>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"Invalid workout id"})
    }
    const workout = await Workout.findOneAndUpdate({_id:id},{...req.body})
    if (!workout) {
        return res.status(400).json({error:"Workout not found"})

    }
    res.status(200).json(workout)
    
}

module.exports = {
    createWorkout,
    getSingleWorkout,
    getAllWorkouts,
    deleteWorkout,
    editWorkout
}