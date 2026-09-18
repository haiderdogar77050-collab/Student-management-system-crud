const Attendance = require("../models/Attendance");

// CREATE Attendance
const createAttendance = async (req, res) => {
    try {
        const { student, course, date, status } = req.body;

        const attendance = await Attendance.create({
            student,
            course,
            date,
            status
        });

        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET All Attendance
const getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find()
            .populate("student")
            .populate("course");

        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET Single Attendance
const getSingleAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id)
            .populate("student")
            .populate("course");

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance not found"
            });
        }

        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// UPDATE Attendance
const updateAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance not found"
            });
        }

        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// DELETE Attendance
const deleteAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(
            req.params.id
        );

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance not found"
            });
        }

        res.status(200).json({
            message: "Attendance deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createAttendance,
    getAttendance,
    getSingleAttendance,
    updateAttendance,
    deleteAttendance
};