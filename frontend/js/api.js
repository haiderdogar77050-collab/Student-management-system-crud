const API_URL = "http://localhost:5000/api";


// GET DATA
async function getData(endpoint) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch data");
        }

        return data;

    } catch (error) {
        console.error("GET Error:", error.message);
        throw error;
    }
}


// POST DATA
async function postData(endpoint, data) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to create data");
        }

        return result;

    } catch (error) {
        console.error("POST Error:", error.message);
        throw error;
    }
}


// PUT DATA
async function updateData(endpoint, data) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to update data");
        }

        return result;

    } catch (error) {
        console.error("PUT Error:", error.message);
        throw error;
    }
}


// DELETE DATA
async function deleteData(endpoint) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to delete data");
        }

        return result;

    } catch (error) {
        console.error("DELETE Error:", error.message);
        throw error;
    }
}