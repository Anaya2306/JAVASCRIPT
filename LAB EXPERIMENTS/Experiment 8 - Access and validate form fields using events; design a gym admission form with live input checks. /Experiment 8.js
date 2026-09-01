// Cache individual DOM elements
const form = document.getElementById('gymForm');
const nameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const membershipSelect = document.getElementById('membership');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const successBanner = document.getElementById('successBanner');

// Regular Expressions
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[6-9]\d{9}$/; 

// Event Listeners for Live Evaluation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);
membershipSelect.addEventListener('change', validateMembership);
passwordInput.addEventListener('input', () => {
    validatePassword();
    if (confirmPasswordInput.value.trim() !== "") {
        validateConfirmPassword(); // Re-verify matching criteria if confirm input has details
    }
});
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

// Submission Management
form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Aggregate validation pass
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMembershipValid = validateMembership();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    if (isNameValid && isEmailValid && isPhoneValid && isMembershipValid && isPasswordValid && isConfirmValid) {
        successBanner.style.display = 'block';
        form.reset();
        
        // Remove tracking states from fields post successful submission
        [nameInput, emailInput, phoneInput, membershipSelect, passwordInput, confirmPasswordInput].forEach(element => {
            element.classList.remove('valid', 'invalid');
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
            successBanner.style.display = 'none';
        }, 4000);
    }
});

// Specific Field Assertions
function validateName() {
    const value = nameInput.value.trim();
    const errorEl = document.getElementById('nameError');
    if (value === "") {
        return showError(nameInput, errorEl, "Name is required.");
    } else if (value.length < 3) {
        return showError(nameInput, errorEl, "Name must be at least 3 characters.");
    }
    return showSuccess(nameInput, errorEl);
}

function validateEmail() {
    const value = emailInput.value.trim();
    const errorEl = document.getElementById('emailError');
    if (value === "") {
        return showError(emailInput, errorEl, "Email is required.");
    } else if (!emailRegex.test(value)) {
        return showError(emailInput, errorEl, "Please enter a valid email address.");
    }
    return showSuccess(emailInput, errorEl);
}

function validatePhone() {
    const value = phoneInput.value.trim();
    const errorEl = document.getElementById('phoneError');
    if (value === "") {
        return showError(phoneInput, errorEl, "Phone number is required.");
    } else if (!phoneRegex.test(value)) {
        return showError(phoneInput, errorEl, "Enter a valid 10-digit number.");
    }
    return showSuccess(phoneInput, errorEl);
}

function validateMembership() {
    const value = membershipSelect.value;
    const errorEl = document.getElementById('membershipError');
    if (!value) {
        return showError(membershipSelect, errorEl, "Please select a membership plan.");
    }
    return showSuccess(membershipSelect, errorEl);
}

function validatePassword() {
    const value = passwordInput.value.trim();
    const errorEl = document.getElementById('passwordError');
    if (value === "") {
        return showError(passwordInput, errorEl, "Password is required.");
    } else if (value.length < 6) {
        return showError(passwordInput, errorEl, "Password must be at least 6 characters.");
    }
    return showSuccess(passwordInput, errorEl);
}

function validateConfirmPassword() {
    const confirmValue = confirmPasswordInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const errorEl = document.getElementById('confirmPasswordError');
    
    if (confirmValue === "") {
        return showError(confirmPasswordInput, errorEl, "Please confirm your password.");
    } else if (confirmValue !== passwordValue) {
        return showError(confirmPasswordInput, errorEl, "Passwords do not match.");
    }
    return showSuccess(confirmPasswordInput, errorEl);
}

// UI Mutators
function showError(element, errorElement, message) {
    errorElement.textContent = message;
    element.classList.add('invalid');
    element.classList.remove('valid');
    return false;
}

// Dynamic input class mutations based on status metrics
function showSuccess(element, errorElement) {
    errorElement.textContent = "";
    element.classList.add('valid');
    element.classList.remove('invalid');
    return true;
}
