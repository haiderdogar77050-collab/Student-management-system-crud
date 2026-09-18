const attendanceForm =
    document.getElementById("attendanceForm");




async function loadStudents() {

    try {

        const students =
            await getData("/students");

        const studentSelect =
            document.getElementById("student");

        if (!studentSelect) return;

        studentSelect.innerHTML =
            '<option value="">Select Student</option>';

        students.forEach(student => {

            const option =
                document.createElement("option");

            option.value =
                student._id;

            option.textContent =
                `${student.name} - ${student.rollNumber}`;

            studentSelect.appendChild(option);

        });

    } catch (error) {

        console.error(
            "Student Loading Error:",
            error.message
        );

    }
}




async function loadCourses() {

    try {

        const courses =
            await getData("/courses");

        const courseSelect =
            document.getElementById("course");

        if (!courseSelect) return;

        courseSelect.innerHTML =
            '<option value="">Select Course</option>';

        courses.forEach(course => {

            const option =
                document.createElement("option");

            option.value =
                course._id;

            option.textContent =
                `${course.courseName} (${course.courseCode})`;

            courseSelect.appendChild(option);

        });

    } catch (error) {

        console.error(
            "Course Loading Error:",
            error.message
        );

    }
}


// ==========================================
// READ ATTENDANCE
// ==========================================

async function loadAttendance() {

    try {

        const attendanceRecords =
            await getData("/attendance");

        const attendanceTable =
            document.getElementById("attendanceTable");

        if (!attendanceTable) return;

        attendanceTable.innerHTML = "";

        attendanceRecords.forEach(record => {

            const row =
                document.createElement("tr");


            let studentName = "N/A";

            if (record.student) {

                if (typeof record.student === "object") {

                    studentName =
                        `${record.student.name || "N/A"}
                        (${record.student.rollNumber || ""})`;

                } else {

                    studentName =
                        record.student;

                }

            }


            let courseName = "N/A";

            if (record.course) {

                if (typeof record.course === "object") {

                    courseName =
                        `${record.course.courseName || "N/A"}
                        (${record.course.courseCode || ""})`;

                } else {

                    courseName =
                        record.course;

                }

            }


            const date =
                record.date
                    ? new Date(record.date).toLocaleDateString()
                    : "N/A";


            row.innerHTML = `

                <td>
                    ${studentName}
                </td>

                <td>
                    ${courseName}
                </td>

                <td>
                    ${date}
                </td>

                <td>
                    ${record.status || "N/A"}
                </td>

                <td>

                    <button
                        type="button"
                        class="btn btn-primary"
                        onclick="editAttendance('${record._id}')"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        class="btn btn-secondary"
                        onclick="deleteAttendance('${record._id}')"
                    >
                        Delete
                    </button>

                </td>

            `;

            attendanceTable.appendChild(row);

        });

    } catch (error) {

        console.error(
            "Attendance Loading Error:",
            error.message
        );

    }

}


// ==========================================
// CREATE ATTENDANCE
// ==========================================

if (attendanceForm) {

    attendanceForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const attendanceData = {

                student:
                    document
                        .getElementById("student")
                        .value,

                course:
                    document
                        .getElementById("course")
                        .value,

                date:
                    document
                        .getElementById("date")
                        .value,

                status:
                    document
                        .getElementById("status")
                        .value

            };


            try {

                await postData(
                    "/attendance",
                    attendanceData
                );

                alert(
                    "Attendance marked successfully!"
                );

                attendanceForm.reset();

                loadAttendance();

            } catch (error) {

                alert(error.message);

            }

        }
    );

}


// ==========================================
// UPDATE ATTENDANCE
// ==========================================

async function editAttendance(id) {

    try {

        const records =
            await getData("/attendance");

        const record =
            records.find(
                item => item._id === id
            );


        if (!record) {

            alert(
                "Attendance record not found!"
            );

            return;

        }


        const newDate =
            prompt(
                "Enter attendance date:",
                record.date
                    ? record.date.substring(0, 10)
                    : ""
            );


        if (newDate === null) return;


        const newStatus =
            prompt(
                "Enter status (Present/Absent/Late):",
                record.status
            );


        if (newStatus === null) return;


        const updatedData = {

            student:
                typeof record.student === "object"
                    ? record.student._id
                    : record.student,

            course:
                typeof record.course === "object"
                    ? record.course._id
                    : record.course,

            date:
                newDate,

            status:
                newStatus.trim()

        };


        const response =
            await fetch(
                `${API_URL}/attendance/${id}`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(updatedData)

                }
            );


        if (!response.ok) {

            const errorData =
                await response.json();

            throw new Error(
                errorData.message ||
                "Failed to update attendance"
            );

        }


        alert(
            "Attendance updated successfully!"
        );


        loadAttendance();

    } catch (error) {

        alert(error.message);

    }

}


// ==========================================
// DELETE ATTENDANCE
// ==========================================

async function deleteAttendance(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this attendance record?"
        );


    if (!confirmDelete) return;


    try {

        const response =
            await fetch(
                `${API_URL}/attendance/${id}`,
                {

                    method: "DELETE"

                }
            );


        if (!response.ok) {

            const errorData =
                await response.json();

            throw new Error(
                errorData.message ||
                "Failed to delete attendance"
            );

        }


        alert(
            "Attendance deleted successfully!"
        );


        loadAttendance();

    } catch (error) {

        alert(error.message);

    }

}


// ==========================================
// LOAD DATA WHEN PAGE OPENS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadStudents();

        loadCourses();

        loadAttendance();

    }
);
