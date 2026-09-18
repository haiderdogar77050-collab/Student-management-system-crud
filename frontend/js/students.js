const studentForm = document.getElementById("studentForm");

// LOAD DEPARTMENTS
async function loadDepartments() {
    try {
        const departments = await getData("/departments");

        const departmentSelect = document.getElementById("department");

        departmentSelect.innerHTML =
            '<option value="">Select Department</option>';

        departments.forEach(department => {
            const option = document.createElement("option");

            option.value = department._id;
            option.textContent =
                `${department.name} (${department.code})`;

            departmentSelect.appendChild(option);
        });

    } catch (error) {
        console.error("Department Loading Error:", error.message);
    }
}


// LOAD STUDENTS
async function loadStudents() {
    try {
        const students = await getData("/students");

        const tableBody =
            document.getElementById("studentsTableBody");

        if (!tableBody) return;

        tableBody.innerHTML = "";

        students.forEach(student => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.rollNumber}</td>
                <td>${student.semester}</td>
                <td>
                    ${student.department
                        ? student.department.name
                        : "N/A"}
                </td>
                <td>
                    <button
                        class="btn btn-primary"
                        onclick="editStudent('${student._id}')">
                        Edit
                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteStudent('${student._id}')">
                        Delete
                    </button>
                </td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Student Loading Error:", error.message);
    }
}


// ADD STUDENT
if (studentForm) {
    studentForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const studentData = {
            name: document.getElementById("name").value.trim(),

            email: document.getElementById("email").value.trim(),

            rollNumber:
                document.getElementById("rollNumber").value.trim(),

            semester:
                Number(document.getElementById("semester").value),

            department:
                document.getElementById("department").value
        };

        try {
            await postData("/students", studentData);

            alert("Student added successfully!");

            studentForm.reset();

            loadStudents();

        } catch (error) {
            alert(error.message);
        }
    });
}


// DELETE STUDENT
async function deleteStudent(id) {

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    try {
        await deleteData(`/students/${id}`);

        alert("Student deleted successfully!");

        loadStudents();

    } catch (error) {
        alert(error.message);
    }
}


// EDIT STUDENT
async function editStudent(id) {

    try {

        const students = await getData("/students");

        const student =
            students.find(item => item._id === id);

        if (!student) {
            alert("Student not found!");
            return;
        }

        const name = prompt(
            "Enter student name:",
            student.name
        );

        if (name === null) return;

        const email = prompt(
            "Enter student email:",
            student.email
        );

        if (email === null) return;

        const rollNumber = prompt(
            "Enter roll number:",
            student.rollNumber
        );

        if (rollNumber === null) return;

        const semester = prompt(
            "Enter semester:",
            student.semester
        );

        if (semester === null) return;

        const studentData = {
            name: name.trim(),
            email: email.trim(),
            rollNumber: rollNumber.trim(),
            semester: Number(semester),

            department:
                student.department
                    ? student.department._id
                    : student.department
        };

        await updateData(
            `/students/${id}`,
            studentData
        );

        alert("Student updated successfully!");

        loadStudents();

    } catch (error) {
        alert(error.message);
    }
}


// INITIAL LOAD
loadDepartments();
loadStudents();