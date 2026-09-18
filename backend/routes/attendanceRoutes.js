const express = require("express");

const {
    createAttendance,
    getAttendance,
    getSingleAttendance,
    updateAttendance,
    deleteAttendance
} = require("../controllers/attendanceController");

const router = express.Router();

router.post("/", createAttendance);


router.get("/", getAttendance);


router.get("/:id", getSingleAttendance);


router.put("/:id", updateAttendance);


router.delete("/:id", deleteAttendance);

module.exports = router;