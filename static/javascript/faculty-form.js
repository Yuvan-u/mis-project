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

// Removed login-form event listener (not needed on this page)

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('facultyForm');
    if (!form) return;

    // Show/hide tick on file input change
    form.querySelectorAll('input[type="file"].upload-input').forEach(fileInput => {
        fileInput.addEventListener('change', function() {
            const tick = form.querySelector(`.upload-status-tick[data-file="${fileInput.name}"]`);
            if (fileInput.files && fileInput.files.length > 0) {
                tick.style.display = 'inline-block';
            } else {
                tick.style.display = 'none';
            }
        });
    });

    // Update status button on file input change
    form.querySelectorAll('input[type="file"].upload-input').forEach(fileInput => {
        fileInput.addEventListener('change', function() {
            const statusBtn = form.querySelector(`.upload-status-btn[data-file="${fileInput.name}"]`);
            if (fileInput.files && fileInput.files.length > 0) {
                statusBtn.textContent = 'Uploaded';
                statusBtn.classList.add('uploaded');
            } else {
                statusBtn.textContent = 'Not Uploaded';
                statusBtn.classList.remove('uploaded');
            }
        });
    });

    // File input change handler (show file name and check size)
    form.querySelectorAll('input[type="file"].upload-input').forEach(fileInput => {
        fileInput.addEventListener('change', function() {
            const label = fileInput.closest('label.upload-label-wrapper');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                if (file.size > 20 * 1024 * 1024) {
                    alert('File size exceeds 20MB. Please select a smaller file.');
                    fileInput.value = '';
                    label.innerHTML = 'Choose File <span class="upload-icon">&#128228;</span>';
                    label.appendChild(fileInput);
                    return;
                }
                label.innerHTML = file.name + ' <span class="upload-icon">&#10003;</span>';
                label.appendChild(fileInput);
            } else {
                label.innerHTML = 'Choose File <span class="upload-icon">&#128228;</span>';
                label.appendChild(fileInput);
            }
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;
        // Validate required header fields
        form.querySelectorAll('select[required], input[required]').forEach(input => {
            if (!input.value) {
                input.classList.add('input-error');
                valid = false;
            } else {
                input.classList.remove('input-error');
            }
        });
        // Validate all status selects
        form.querySelectorAll('select[name^="status"]').forEach(sel => {
            if (!sel.value || sel.value === 'Select') {
                sel.classList.add('input-error');
                valid = false;
            } else {
                sel.classList.remove('input-error');
            }
        });
        // Validate all descriptions (<=200 chars)
        form.querySelectorAll('input[type="text"][name^="desc"]').forEach(desc => {
            if (desc.value.length > 200) {
                desc.classList.add('input-error');
                valid = false;
            } else {
                desc.classList.remove('input-error');
            }
        });
        // Validate file size for all file inputs
        form.querySelectorAll('input[type="file"].upload-input').forEach(fileInput => {
            if (!fileInput.files || fileInput.files.length === 0) {
                fileInput.classList.add('input-error');
                valid = false;
            } else if (fileInput.files[0].size > 20 * 1024 * 1024) {
                fileInput.classList.add('input-error');
                valid = false;
            } else {
                fileInput.classList.remove('input-error');
            }
        });
        if (!valid) {
            alert('Please fill all required fields and ensure file size is within 20MB and description is 0-200 characters.');
            return;
        }
        alert('Form submitted successfully!');
        form.reset();
    });
});
