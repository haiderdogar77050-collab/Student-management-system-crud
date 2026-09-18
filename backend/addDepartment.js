const mongoose = require("mongoose");
require("dotenv").config();

const Department = require("./models/Department");

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB connected");

        const department = await Department.create({
            name: "Computer Science",
            code: "CS"
        });

        console.log("Department added:");
        console.log(department);

        mongoose.connection.close();
    })
    .catch((error) => {
        console.log(error.message);
    });