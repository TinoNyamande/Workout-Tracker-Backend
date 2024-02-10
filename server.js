require("dotenv").config();

const express = require("express")


const app = express();

app.listen(process.env.PORT, ()=>{
    console.log("Listening on port 4000")
})

app.get("/",(req,res)=>{
    res.json({mssg:"Welcome to my app"})
})