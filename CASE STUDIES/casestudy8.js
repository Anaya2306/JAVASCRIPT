document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('jobForm');
    const successBanner = document.getElementById('successBanner');
    const inputs = form.querySelectorAll('input, select');

    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid') || input.classList.contains('valid')) {
                validateField(input);
            }
        });
    });

    function validateField(input) {
        const errorElement = document.getElementById(`${input.id}Error`);
        let isValid = true;
        let message = "";

        if (!input.value.trim()) {
            isValid = false;
            message = "This field is required.";
        } else if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                message = "Please enter a valid email address.";
            }
        } else if (input.id === 'mobile') {
            const mobileRegex = /^[0-9]{10}$/;
            if (!mobileRegex.test(input.value.replace(/\s+/g, ''))) {
                isValid = false;
                message = "Please enter a valid 10-digit phone number.";
            }
        }

        if (isValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
            errorElement.textContent = "";
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
            errorElement.textContent = message;
        }

        return isValid;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        inputs.forEach(input => {
            const isFieldValid = validateField(input);
            if (!isFieldValid) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            successBanner.style.display = 'block';
            form.reset();
            
            inputs.forEach(input => input.classList.remove('valid', 'invalid'));
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            setTimeout(() => {
                successBanner.style.display = 'none';
            }, 5000);
        }
    });
});
