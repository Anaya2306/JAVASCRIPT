// --- GLOBAL FORM HANDLING INTERFACE ---
function handlePortfolioSubmit() {
    const studentName = document.getElementById('studentName');
    const studentPhone = document.getElementById('studentPhone');
    const studentEmail = document.getElementById('studentEmail');
    const studentSummary = document.getElementById('studentSummary');

    // Validation alerts
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');

    // Summary panel metrics
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const sentenceCount = document.getElementById('sentenceCount');

    // Printing boxes
    const submissionSuccess = document.getElementById('submissionSuccess');
    const summaryPreview = document.getElementById('summaryPreview');

    let isValid = true;

    // 1. Validate Student Full Name
    if (!studentName.value.trim()) {
        nameError.style.display = 'block';
        studentName.style.borderColor = 'var(--error-color)';
        isValid = false;
    } else {
        nameError.style.display = 'none';
        studentName.style.borderColor = 'var(--border)';
    }

    // 2. Validate Phone: Explicitly look for a 10-digit number string
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(studentPhone.value.trim())) {
        phoneError.style.display = 'block';
        studentPhone.style.borderColor = 'var(--error-color)';
        isValid = false;
    } else {
        phoneError.style.display = 'none';
        studentPhone.style.borderColor = 'var(--border)';
    }

    // 3. Validate Email: Clean standard structure regex check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(studentEmail.value.trim())) {
        emailError.style.display = 'block';
        studentEmail.style.borderColor = 'var(--error-color)';
        isValid = false;
    } else {
        emailError.style.display = 'none';
        studentEmail.style.borderColor = 'var(--border)';
    }

    // --- RENDER PORTFOLIO PREVIEW DASHBOARD ---
    if (isValid) {
        const text = studentSummary.value;

        // Perform text computations strictly on valid form submit
        const calculatedChars = text.length;
        const calculatedWords = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        const calculatedSentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

        // Display string updates inside live metric panel boxes on screen
        charCount.textContent = calculatedChars;
        wordCount.textContent = calculatedWords;
        sentenceCount.textContent = calculatedSentences;

        // Display dynamic success box layout below form
        submissionSuccess.style.display = 'block';
        
        summaryPreview.innerHTML = `
            <strong>Name:</strong> ${studentName.value.trim()} <br>
            <strong>Phone:</strong> ${studentPhone.value.trim()} <br>
            <strong>Email:</strong> ${studentEmail.value.trim()} <br><br>
            <strong>Summary Analytics:</strong> ${calculatedWords} words | ${calculatedChars} characters | ${calculatedSentences} sentences <br><br>
            <strong>Bio Paragraph:</strong><br>
            ${text.trim() || 'No text summary entered.'}
        `.trim();

        // REMOVED ALL FORM RESET RUNNERS! Inputs will stay visible on screen now.
    } else {
        submissionSuccess.style.display = 'none';
    }
}

// --- ATTACH UTILITY HANDLERS AFTER CONTAINER BOOTSTRAP ---
document.addEventListener('DOMContentLoaded', () => {
    const studentSummary = document.getElementById('studentSummary');

    document.getElementById('btnUpper').addEventListener('click', () => {
        studentSummary.value = studentSummary.value.toUpperCase();
    });

    document.getElementById('btnLower').addEventListener('click', () => {
        studentSummary.value = studentSummary.value.toLowerCase();
    });

    document.getElementById('btnTrim').addEventListener('click', () => {
        studentSummary.value = studentSummary.value.replace(/\s+/g, ' ');
    });
});
