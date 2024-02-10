require("dotenv").config();
const workoutRoutes = require("./routes/workout");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use((req, res, next) => {
  console.log("Path", req.path);
  console.log("Method", req.method);
  next();
});

app.use(express.json());
app.use("/api/workouts", workoutRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then((response) => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
