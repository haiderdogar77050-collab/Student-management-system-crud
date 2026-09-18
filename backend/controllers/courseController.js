const Course = require("../models/Course");

// CREATE Course
const createCourse = async (req, res) => {
    try {
        const { courseName, courseCode, creditHours, department } = req.body;

        const course = await Course.create({
            courseName,
            courseCode,
            creditHours,
            department
        });

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET All Courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate("department");

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET Single Course
const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate("department");

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// UPDATE Course
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// DELETE Course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(
            req.params.id
        );

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json({
            message: "Course deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse
};