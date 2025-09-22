// document.addEventListener('DOMContentLoaded', function () {
//     const formContainer = document.querySelector('.form-container');
//     const previewBtn = document.querySelector('.preview-btn');
//     const saveBtn = document.querySelector('.save-btn');

//     // Preview mode toggle
//     previewBtn.addEventListener('click', function () {
//         formContainer.classList.toggle('preview-mode');
//         const sections = document.querySelectorAll('.form-section');
//         if (formContainer.classList.contains('preview-mode')) {
//             // Enter preview mode: show first section
//             if (sections.length > 0) {
//                 sections.forEach(s => s.classList.remove('active'));
//                 sections[0].classList.add('active');
//                 updateNavigation(sections[0]);
//             }
//         } else {
//             // Exit preview mode: show all sections
//             sections.forEach(section => section.classList.remove('active'));
//         }
//     });

//     // Navigation in preview mode
//     formContainer.addEventListener('click', function (event) {
//         const currentSection = event.target.closest('.form-section');
//         if (!currentSection) return;

//         if (event.target.classList.contains('next-section')) {
//             const nextSection = currentSection.nextElementSibling;
//             if (nextSection && nextSection.classList.contains('form-section')) {
//                 currentSection.classList.remove('active');
//                 nextSection.classList.add('active');
//                 updateNavigation(nextSection);
//             }
//         } else if (event.target.classList.contains('prev-section')) {
//             const prevSection = currentSection.previousElementSibling;
//             if (prevSection && prevSection.classList.contains('form-section')) {
//                 currentSection.classList.remove('active');
//                 prevSection.classList.add('active');
//                 updateNavigation(prevSection);
//             }
//         }
//     });

//     // Save form data (replace with backend call)
//     saveBtn.addEventListener('click', function () {
//         const formData = {
//             title: document.querySelector('.form-title').value,
//             description: document.querySelector('.form-description').value,
//             sections: []
//         };

//         document.querySelectorAll('.form-section').forEach(section => {
//             const sectionData = {
//                 badge: section.querySelector('.section-badge').textContent,
//                 questions: []
//             };
//             section.querySelectorAll('.question-block').forEach(block => {
//                 const question = {
//                     title: block.querySelector('.question-title').textContent,
//                     input: block.querySelector('.preview-input-field').value
//                 };
//                 sectionData.questions.push(question);
//             });
//             formData.sections.push(sectionData);
//         });

//         console.log('Form Data to Save:', formData);
//         alert('Form data logged to console. Add your backend save here.');
//     });

//     // Update navigation button states
//     function updateNavigation(currentSection) {
//         const prevButton = currentSection.querySelector('.prev-section');
//         const nextButton = currentSection.querySelector('.next-section');
//         const prevSection = currentSection.previousElementSibling;
//         const nextSection = currentSection.nextElementSibling;

//         prevButton.disabled = !(prevSection && prevSection.classList.contains('form-section'));
//         nextButton.disabled = !(nextSection && nextSection.classList.contains('form-section'));
//     }

//     // Add event listeners to section controls
//     function addEventListenersToSection(section) {
//         const duplicateButton = section.querySelector('.duplicate-question');
//         const deleteButton = section.querySelector('.delete-question');

//         duplicateButton.addEventListener('click', function () {
//             const section = this.closest('.form-section');
//             const clonedSection = section.cloneNode(true);
//             section.parentNode.insertBefore(clonedSection, section.nextSibling);
//             addEventListenersToSection(clonedSection);
//             clonedSection.scrollIntoView({ behavior: 'smooth' });
//         });

//         deleteButton.addEventListener('click', function () {
//             const section = this.closest('.form-section');
//             if (document.querySelectorAll('.form-section').length > 1) {
//                 section.remove();
//             }
//         });
//     }

//     // Event delegation for adding sections
//     formContainer.addEventListener('click', function (event) {
//         if (event.target.closest('.add-section')) {
//             const sectionTemplate = document.querySelector('.form-section[data-section="2"]');
//             const newSection = sectionTemplate.cloneNode(true);
//             newSection.querySelectorAll('input').forEach(input => input.value = '');
//             sectionTemplate.parentNode.appendChild(newSection);
//             addEventListenersToSection(newSection);
//             newSection.scrollIntoView({ behavior: 'smooth' });
//         }
//     });

//     // Initialize existing sections
//     document.querySelectorAll('.form-section').forEach(section => {
//         addEventListenersToSection(section);
//     });
// });



// document.getElementById('userIcon').addEventListener('click', function() {
//     const userMenu = document.getElementById('userMenu');
//     userMenu.classList.toggle('hidden');
// });

// document.addEventListener('click', function(event) {
//     const userIcon = document.getElementById('userIcon');
//     const userMenu = document.getElementById('userMenu');
//     if (!userIcon.contains(event.target) && !userMenu.contains(event.target)) {
//         userMenu.classList.add('hidden');
//     }
// });