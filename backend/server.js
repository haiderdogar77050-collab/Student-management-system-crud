const cors = require("cors");

const attendanceRoutes = require("./routes/attendanceRoutes");

const courseRoutes = require("./routes/courseRoutes");

const studentRoutes = require("./routes/studentRoutes");

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

const departmentRoutes = require("./routes/departmentRoutes");

app.use(cors());

app.use("/api/departments", departmentRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/courses", courseRoutes);


app.use("/api/attendance", attendanceRoutes);

app.use(cors());

app.get("/", (req, res) => {
    res.send("Student Management System API is running");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed");
        console.log(error.message);
    });