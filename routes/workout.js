const express = require("express")

const router = express.Router();

router.get("/",(req,res)=>{
    res.json({msg:"Get all workouts"})
})

router.get("/:id" , (req,res)=>{
    res.json({msg:"Single workout"})
})

router.post("/",(req,res)=>{
    res.json({msg:"Post new workout"})
})

router.delete("/:id",(req,res)=>{
    res.json({msg:"DELETE a workout"})
})

router.patch("/:id",(req,res)=>{
    res.json({msg:"Update a workout"})
})

module.exports = router