let form = document.getElementById("signupForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let firstname = document.getElementById("firstname").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let repassword = document.getElementById("repassword").value;
    let terms = document.getElementById("terms").checked;
    let message = document.getElementById("message");

    if (firstname == "") {
        message.innerHTML = "First Name is required.";
        return;
    }

    if (username == "") {
        message.innerHTML = "Username is required.";
        return;
    }

    if (password == "") {
        message.innerHTML = "Password is required.";
        return;
    }

    if (repassword == "") {
        message.innerHTML = "Please re-enter your password.";
        return;
    }

    // Check password match
    if (password != repassword) {
        message.innerHTML = "Passwords do not match.";
        return;
    }

    // Check terms
    if (!terms) {
        message.innerHTML = "Please agree to the Terms & Conditions.";
        return;
    }

    message.innerHTML = "Sign Up Successful!";

});