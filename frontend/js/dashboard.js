async function loadDashboard() {
    try {

        const students = await getData("/students");
        const courses = await getData("/courses");
        const departments = await getData("/departments");
        const attendance = await getData("/attendance");


        document.getElementById("totalStudents").textContent =
            students.length;

        document.getElementById("totalCourses").textContent =
            courses.length;

        document.getElementById("totalDepartments").textContent =
            departments.length;

        document.getElementById("totalAttendance").textContent =
            attendance.length;


    } catch (error) {

        console.error(
            "Dashboard Error:",
            error.message
        );

    }
}


loadDashboard();