const departmentForm = document.getElementById("departmentForm");


// ==========================================
// CREATE DEPARTMENT
// ==========================================

if (departmentForm) {

    departmentForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const departmentData = {

            name: document.getElementById("name").value.trim(),

            code: document.getElementById("code").value.trim()

        };

        try {

            await postData(
                "/departments",
                departmentData
            );

            alert("Department added successfully!");

            departmentForm.reset();

            loadDepartments();

        } catch (error) {

            alert(error.message);

        }

    });

}


// ==========================================
// READ DEPARTMENTS
// ==========================================

async function loadDepartments() {

    try {

        const departments = await getData("/departments");

        const departmentTable =
            document.getElementById("departmentTable");

        if (!departmentTable) return;

        departmentTable.innerHTML = "";

        departments.forEach(department => {

            const row = document.createElement("tr");

            row.innerHTML = `

                <td>${department.name}</td>

                <td>${department.code}</td>

                <td>

                    <button onclick="editDepartment('${department._id}')">
                        Edit
                    </button>

                    <button onclick="deleteDepartment('${department._id}')">
                        Delete
                    </button>

                </td>

            `;

            departmentTable.appendChild(row);

        });

    } catch (error) {

        console.error("Error loading departments:", error);

    }

}


// ==========================================
// UPDATE DEPARTMENT
// ==========================================

async function editDepartment(id) {

    try {

        const departments = await getData("/departments");

        const department = departments.find(
            item => item._id === id
        );

        if (!department) {

            alert("Department not found!");

            return;

        }

        const newName = prompt(
            "Enter department name:",
            department.name
        );

        if (newName === null) return;

        const newCode = prompt(
            "Enter department code:",
            department.code
        );

        if (newCode === null) return;

        const updatedData = {

            name: newName.trim(),

            code: newCode.trim()

        };

        const response = await fetch(
            `${API_URL}/departments/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(updatedData)
            }
        );

        if (!response.ok) {

            const errorData = await response.json();

            throw new Error(
                errorData.message ||
                "Failed to update department"
            );

        }

        alert("Department updated successfully!");

        loadDepartments();

    } catch (error) {

        alert(error.message);

    }

}


// ==========================================
// DELETE DEPARTMENT
// ==========================================

async function deleteDepartment(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this department?"
    );

    if (!confirmDelete) return;

    try {

        const response = await fetch(
            `${API_URL}/departments/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {

            const errorData = await response.json();

            throw new Error(
                errorData.message ||
                "Failed to delete department"
            );

        }

        alert("Department deleted successfully!");

        loadDepartments();

    } catch (error) {

        alert(error.message);

    }

}


// ==========================================
// LOAD DEPARTMENTS WHEN PAGE OPENS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadDepartments();

});