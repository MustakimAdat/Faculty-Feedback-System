// Function to update section numbers dynamically
function updateSectionNumbers() {
    document.querySelectorAll('.form-section').forEach((section, index) => {
        section.querySelector('.section-badge').textContent = `Subject ${index + 1}`;
    });
}



//form_edit
document.addEventListener('DOMContentLoaded', function () {
    const formContainer = document.querySelector('.form-container');
    const saveBtn = document.querySelector('.save-btn');

    // Function to update section numbers (e.g., Subject 1, Subject 2, etc.)
    function updateSectionNumbers() {
        document.querySelectorAll('.form-section').forEach((section, index) => {
            const badge = section.querySelector('.section-badge');
            badge.textContent = `Subject ${index + 1}`;
        });
    }

    // Add event listeners to section controls
    function addEventListenersToSection(section) {
        const duplicateButton = section.querySelector('.duplicate-question');
        const deleteButton = section.querySelector('.delete-question');
        const addSectionButton = section.querySelector('.add-section');

        duplicateButton.addEventListener('click', function () {
            const clonedSection = section.cloneNode(true);
            section.parentNode.insertBefore(clonedSection, section.nextSibling);
            addEventListenersToSection(clonedSection);
            updateSectionNumbers();
            clonedSection.scrollIntoView({ behavior: 'smooth' });
        });

        deleteButton.addEventListener('click', function () {
            if (document.querySelectorAll('.form-section').length > 1) {
                section.remove();
                updateSectionNumbers();
            }
        });

        addSectionButton.addEventListener('click', function () {
            const sectionTemplate = document.querySelector('.form-section[data-section="2"]');
            const newSection = sectionTemplate.cloneNode(true);
            newSection.querySelectorAll('input').forEach(input => input.value = '');
            formContainer.appendChild(newSection);
            addEventListenersToSection(newSection);
            updateSectionNumbers();
            newSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Initialize existing sections
    document.querySelectorAll('.form-section').forEach(section => {
        addEventListenersToSection(section);
    });

    updateSectionNumbers();

    // Save form function
    function saveForm(event) {
        event.preventDefault(); // Default form submission ko rokna

        const formTitle = document.querySelector('.form-title').value;
        const formDescription = document.querySelector('.form-description').value;
        const subjects = [];

        document.querySelectorAll('.form-section').forEach(section => {
            const subjectName = section.querySelector('.subject-name').value;
            const facultyName = section.querySelector('.faculty-name').value;
            if (subjectName && facultyName) {
                subjects.push({
                    subject_name: subjectName,
                    faculty_name: facultyName
                });
            }
        });

        const formData = {
            form_title: formTitle,
            form_description: formDescription,
            subjects: subjects
        };

        console.log('Form Data:', formData); // Debugging ke liye console par dikhana

        // Form ID URL se extract karna (e.g., /edit/<form_id>)
        const formId = window.location.pathname.split('/').pop();

        fetch(`/form/edit/${formId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Success message
            window.location.href = '/form/dashboard'; // Dashboard par redirect
        })
        .catch(error => console.error('Error:', error));
    }

    // Form ke submit event par saveForm chalana
    document.getElementById('editForm').addEventListener('submit', saveForm);
});








//navbar.js
document.getElementById('userIcon').addEventListener('click', function() {
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.toggle('hidden');
});

document.addEventListener('click', function(event) {
    const userIcon = document.getElementById('userIcon');
    const userMenu = document.getElementById('userMenu');
    if (!userIcon.contains(event.target) && !userMenu.contains(event.target)) {
        userMenu.classList.add('hidden');
    }
});



//dashborde.js
// document.getElementById("newFormBtn").addEventListener("click", function() {
//     fetch("/form/new")  // ✅ Corrected Route
//     .then(response => response.text())  // JSON ki jagah plain text
//     .then(data => {
//         const formId = data.split("/edit/")[1];  // Extract form_id
//         window.location.href = "/form/edit/" + formId;  // Redirect to new form
//     })
//     .catch(error => console.error("Error:", error));
// });

function deleteForm(formId, event) {
    event.stopPropagation(); // prevent triggering the card's click event
    if (confirm("Are you sure you want to delete this form?")) {
        fetch(`/form/delete/${formId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            // Remove the form card from the dashboard
            document.querySelector(`[data-form-id="${formId}"]`).remove();
        })
        .catch(error => console.error('Error:', error));
    }
}







