document.getElementById("facultyForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const department = this.department.value;
    const year = this.year.value;
    const section = this.section.value;

    if (department && year && section) {
        alert(`Selected:\nDepartment: \nYear: ${year}\nSection: ${section}`);
    } else {
        alert("Please select all fields before submitting.");
    }
    
});

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Stop form from submitting to server
    window.location.href = "faculty.html"; // Redirect to faculty page
});


// faculty-upload.js
document.addEventListener("DOMContentLoaded", () => {
    const sections = [
        { title: "WEEKLY", files: ["Lab Visit File", "Theory Class Monitoring File", "Placement File", "Training File"] },
        { title: "ONCE IN 15 DAYS", files: ["Department Meeting File", "Career Guidance Program File"] },
        { title: "ONCE IN A SEMESTER", files: ["Department Budget File", "PAC File", "DAAC File", "BOS File", "Department Academic Calender File", "Subject Allocation File", "Workload", "Time Table File", "Vision, Mission, PO, PEO Process & Dissemination File", "Syllabus & Regulations File"] },
        { title: "ONCE IN A YEAR", files: ["Admission File", "Dept.Best Practices File"] }
    ];

    const fileList = document.getElementById("fileList");
    let count = 1;

    sections.forEach(section => {
        const trSection = document.createElement("tr");
        trSection.innerHTML = `<td colspan="5" class="section-header">${section.title}</td>`;
        fileList.appendChild(trSection);

        section.files.forEach(fileName => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${count++}.</td>
                <td>${fileName}</td>
                <td>
                    <select>
                        <option>Select</option>
                        <option>Completed</option>
                        <option>Pending</option>
                    </select>
                </td>
                <td><input type="text" placeholder=""></td>
                <td><input type="file"></td>
            `;
            fileList.appendChild(tr);
        });
    });

    document.getElementById("uploadForm").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Form submitted!");
    });
});
