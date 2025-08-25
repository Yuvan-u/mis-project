
let selectedRole = "";
// Role to page mapping
const rolePages = {
    management: "management.html",
    principal: "principal.html",
    iqac: "iqac.html",
    hod: "hod.html",
    faculty: "faculty.html"
};

function setRole(role) {
    selectedRole = role.toLowerCase();
    document.getElementById("login-title").textContent = `LOGIN AS ${role}`;
}

function togglePassword() {
    const passwordInput = document.getElementById("password");
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    if (!selectedRole) {
        alert("Please select a role first!");
        return;
    }
    const page = rolePages[selectedRole];
    if (page) {
        window.location.href = page;
    } else {
        alert("Invalid role selected!");
    }
});


// add faculty


    // Get Department from URL (e.g. faculty-list.html?dept=Computer%20Science)
    const params = new URLSearchParams(window.location.search);
    const dept = params.get("dept");
    if (dept) {
        document.getElementById("departmentName").textContent = "Department: " + dept;
    }

    // Redirect to Add Faculty Page on button click
    document.getElementById("addFacultyBtn").addEventListener("click", function () {
        window.location.href = "add-faculty.html";
    });



