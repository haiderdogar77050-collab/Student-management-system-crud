const Student = require("../models/Student");

// CREATE Student
const createStudent = async (req, res) => {
    try {
        const { name, email, rollNumber, semester, department } = req.body;

        const student = await Student.create({
            name,
            email,
            rollNumber,
            semester,
            department
        });

        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET All Students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find()
            .populate("department");

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET Single Student
const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
            .populate("department");

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// UPDATE Student
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// DELETE Student
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent
};