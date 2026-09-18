const courseForm =
    document.getElementById("courseForm");


// ==========================================
// LOAD DEPARTMENTS
// ==========================================

async function loadCourseDepartments() {

    try {

        const departments =
            await getData("/departments");

        const departmentSelect =
            document.getElementById("department");

        if (!departmentSelect) return;

        departmentSelect.innerHTML =
            '<option value="">Select Department</option>';

        departments.forEach(department => {

            const option =
                document.createElement("option");

            option.value =
                department._id;

            option.textContent =
                `${department.name} (${department.code})`;

            departmentSelect.appendChild(option);

        });

    } catch (error) {

        console.error(
            "Department Loading Error:",
            error.message
        );

    }
}


// ==========================================
// LOAD COURSES - READ
// ==========================================

async function loadCourses() {

    try {

        const courses =
            await getData("/courses");

        const courseTable =
            document.getElementById("courseTable");

        if (!courseTable) return;

        courseTable.innerHTML = "";

        courses.forEach(course => {

            const row =
                document.createElement("tr");

            let departmentName = "N/A";

            if (course.department) {

                if (typeof course.department === "object") {

                    departmentName =
                        `${course.department.name || "N/A"} 
                        (${course.department.code || ""})`;

                } else {

                    departmentName =
                        course.department;

                }

            }

            row.innerHTML = `

                <td>
                    ${course.courseName}
                </td>

                <td>
                    ${course.courseCode}
                </td>

                <td>
                    ${course.creditHours}
                </td>

                <td>
                    ${departmentName}
                </td>

                <td>

                    <button
                        type="button"
                        onclick="editCourse('${course._id}')"
                        class="btn btn-primary"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onclick="deleteCourse('${course._id}')"
                        class="btn btn-secondary"
                    >
                        Delete
                    </button>

                </td>

            `;

            courseTable.appendChild(row);

        });

    } catch (error) {

        console.error(
            "Course Loading Error:",
            error.message
        );

    }

}


// ==========================================
// CREATE COURSE
// ==========================================

if (courseForm) {

    courseForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const courseData = {

                courseName:
                    document
                        .getElementById("courseName")
                        .value
                        .trim(),

                courseCode:
                    document
                        .getElementById("courseCode")
                        .value
                        .trim(),

                creditHours:
                    Number(
                        document
                            .getElementById("creditHours")
                            .value
                    ),

                department:
                    document
                        .getElementById("department")
                        .value

            };


            try {

                await postData(
                    "/courses",
                    courseData
                );

                alert(
                    "Course added successfully!"
                );

                courseForm.reset();

                loadCourses();

            } catch (error) {

                alert(error.message);

            }

        }
    );

}


// ==========================================
// UPDATE COURSE
// ==========================================

async function editCourse(id) {

    try {

        const courses =
            await getData("/courses");

        const course =
            courses.find(
                item => item._id === id
            );

        if (!course) {

            alert("Course not found!");

            return;

        }


        const newCourseName =
            prompt(
                "Enter course name:",
                course.courseName
            );

        if (newCourseName === null) return;


        const newCourseCode =
            prompt(
                "Enter course code:",
                course.courseCode
            );

        if (newCourseCode === null) return;


        const newCreditHours =
            prompt(
                "Enter credit hours:",
                course.creditHours
            );

        if (newCreditHours === null) return;


        const updatedData = {

            courseName:
                newCourseName.trim(),

            courseCode:
                newCourseCode.trim(),

            creditHours:
                Number(newCreditHours),

            department:
                typeof course.department === "object"
                    ? course.department._id
                    : course.department

        };


        const response =
            await fetch(
                `${API_URL}/courses/${id}`,
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
                "Failed to update course"
            );

        }


        alert(
            "Course updated successfully!"
        );


        loadCourses();


    } catch (error) {

        alert(error.message);

    }

}


// ==========================================
// DELETE COURSE
// ==========================================

async function deleteCourse(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this course?"
        );

    if (!confirmDelete) return;


    try {

        const response =
            await fetch(
                `${API_URL}/courses/${id}`,
                {

                    method: "DELETE"

                }
            );


        if (!response.ok) {

            const errorData =
                await response.json();

            throw new Error(
                errorData.message ||
                "Failed to delete course"
            );

        }


        alert(
            "Course deleted successfully!"
        );


        loadCourses();


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

        loadCourseDepartments();

        loadCourses();

    }
);