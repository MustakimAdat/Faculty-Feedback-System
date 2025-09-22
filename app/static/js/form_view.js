document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.form-section');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const form = document.getElementById('multiStepForm');

    let currentStepIndex = 0;

    function showSection(index) {
        sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('active');
                section.style.display = 'block';
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                section.classList.remove('active');
                section.style.display = 'none';
            }
        });
        currentStepIndex = index;
    }

    function validateCurrentSection() {
        let isValid = true;
        const currentSectionElement = sections[currentStepIndex];
        const inputs = currentSectionElement.querySelectorAll('input[required], select[required], textarea[required]');

        inputs.forEach(input => {
            if (input.type === 'radio') {
                const radioGroup = input.name;
                const radioInputs = currentSectionElement.querySelectorAll(`input[name="${radioGroup}"]`);
                const isAnySelected = Array.from(radioInputs).some(radio => radio.checked);

                if (!isAnySelected) {
                    isValid = false;
                    const ratingItem = input.closest('.rating-item');
                    if (ratingItem) {
                        const errorMessage = document.createElement('span');
                        errorMessage.classList.add('error-message');
                        errorMessage.style.color = 'red';
                        errorMessage.textContent = 'Please select an option';
                        ratingItem.parentNode.insertBefore(errorMessage, ratingItem.nextSibling);
                    }
                }
            } else {
                if (!input.checkValidity()) {
                    isValid = false;
                    input.classList.add('invalid');
                    const errorMessage = document.createElement('span');
                    errorMessage.classList.add('error-message');
                    errorMessage.style.color = 'red';
                    errorMessage.textContent = 'Please fill this field';
                    input.parentNode.appendChild(errorMessage);
                    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    input.focus();
                } else {
                    input.classList.remove('invalid');
                }
            }
        });

        return isValid;
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateCurrentSection()) {
                if (currentStepIndex < sections.length - 1) {
                    showSection(currentStepIndex + 1);
                }
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStepIndex > 0) {
                showSection(currentStepIndex - 1);
            }
        });
    });

    form.addEventListener('submit', (event) => {
        let allValid = true;
        let firstInvalidField = null;

        sections.forEach((section) => {
            const inputs = section.querySelectorAll('input[required], select[required], textarea[required]');
            inputs.forEach(input => {
                if (input.type === 'radio') {
                    const radioGroup = input.name;
                    const radioInputs = section.querySelectorAll(`input[name="${radioGroup}"]`);
                    const isAnySelected = Array.from(radioInputs).some(radio => radio.checked);

                    if (!isAnySelected) {
                        allValid = false;
                        const ratingItem = input.closest('.rating-item');
                        if (ratingItem) {
                            const errorMessage = document.createElement('span');
                            errorMessage.classList.add('error-message');
                            errorMessage.style.color = 'red';
                            errorMessage.textContent = 'Please select an option';
                            ratingItem.parentNode.insertBefore(errorMessage, ratingItem.nextSibling);
                            if (!firstInvalidField) {
                                firstInvalidField = ratingItem;
                            }
                        }
                    }
                } else {
                    if (!input.checkValidity()) {
                        allValid = false;
                        input.classList.add('invalid');
                        const errorMessage = document.createElement('span');
                        errorMessage.classList.add('error-message');
                        errorMessage.style.color = 'red';
                        errorMessage.textContent = 'Please fill this field';
                        input.parentNode.appendChild(errorMessage);
                        if (!firstInvalidField) {
                            firstInvalidField = input;
                        }
                    } else {
                        input.classList.remove('invalid');
                    }
                }
            });
        });

        if (!allValid) {
            event.preventDefault();
            if (firstInvalidField) {
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (firstInvalidField.tagName === 'INPUT' || firstInvalidField.tagName === 'SELECT' || firstInvalidField.tagName === 'TEXTAREA') {
                    firstInvalidField.focus();
                }
            }
        }
    });

    showSection(0);
});