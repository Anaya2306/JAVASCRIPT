let students = [];

// HTML elements
const fetchButton = document.getElementById("fetchButton");
const jqueryButton = document.getElementById("jqueryButton");
const searchBox = document.getElementById("searchBox");
const statusFilter = document.getElementById("statusFilter");
const tableBody = document.getElementById("studentTableBody");
const message = document.getElementById("message");

// Display student data in the table
function displayStudents(studentList) {
    tableBody.innerHTML = "";

    if (studentList.length === 0) {
        message.textContent = "No students match the search/filter criteria.";
        return;
    }

    message.textContent = "";

    studentList.forEach(function(student) {
        const row = document.createElement("tr");

        const statusClass =
            student.registrationStatus.toLowerCase();

        row.innerHTML = `
            <td>${student.studentName}</td>
            <td>${student.prn}</td>
            <td>${student.department}</td>
            <td>${student.year}</td>
            <td>${student.eventName}</td>
            <td class="status-${statusClass}">
                ${student.registrationStatus}
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Filter students by name, PRN, and registration status
function filterStudents() {
    const searchText = searchBox.value.toLowerCase().trim();
    const selectedStatus = statusFilter.value;

    const filteredStudents = students.filter(function(student) {
        const matchesSearch =
            student.studentName.toLowerCase().includes(searchText) ||
            student.prn.toLowerCase().includes(searchText);

        const matchesStatus =
            selectedStatus === "All" ||
            student.registrationStatus === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    displayStudents(filteredStudents);
}

// Load JSON data using JavaScript fetch()
function loadUsingFetch() {
    message.textContent = "Loading student data...";
    tableBody.innerHTML = "";

    fetch("students.json")
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Unable to load JSON data.");
            }

            return response.json();
        })
        .then(function(data) {
            students = data;
            displayStudents(students);
        })
        .catch(function(error) {
            tableBody.innerHTML = "";
            message.textContent =
                "JSON data cannot be loaded. Please check the file.";
            console.error(error);
        });
}


function loadUsingJQuery() {
    message.textContent = "Loading student data...";
    tableBody.innerHTML = "";

    $.getJSON("students.json")
        .done(function(data) {
            students = data;
            displayStudents(students);
        })
        .fail(function(error) {
            tableBody.innerHTML = "";
            message.textContent =
                "JSON data cannot be loaded. Please check the file.";
            console.error(error);
        });
}


fetchButton.addEventListener("click", loadUsingFetch);


jqueryButton.addEventListener("click", loadUsingJQuery);


searchBox.addEventListener("input", filterStudents);
statusFilter.addEventListener("change", filterStudents);

fetchButton.addEventListener("click", loadUsingFetch);
jqueryButton.addEventListener("click", loadUsingJQuery);

searchBox.addEventListener("input", filterStudents);
statusFilter.addEventListener("change", filterStudents);


fetchButton.addEventListener("click", loadUsingFetch);


jqueryButton.addEventListener("click", loadUsingJQuery);


searchBox.addEventListener("input", function() {
    if (students.length === 0) {
        loadUsingFetch();
    } else {
        filterStudents();
    }
});


statusFilter.addEventListener("change", function() {
    if (students.length > 0) {
        filterStudents();
    }
});

