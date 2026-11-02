const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        loginMessage.textContent = "Please enter email and password.";
        return;
    }

    if (password.length < 6) {
        loginMessage.textContent =
            "Password must contain at least 6 characters.";
        return;
    }

    loginMessage.textContent = "Login successful.";
});