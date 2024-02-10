require("dotenv").config();
const workoutRoutes = require("./routes/workout")

const express = require("express")


const app = express();


app.use((req,res,next)=>{
    console.log("Path",req.path)
    console.log("Method",req.method)
    next()
})

app.listen(process.env.PORT, ()=>{
    console.log("Listening on port 4000")
})
app.use(express.json())
app.use("/api/workouts" ,workoutRoutes)