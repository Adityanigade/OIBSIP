const form = document.getElementById("registerForm");

form.addEventListener("submit", async function(e) {

    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim().toLowerCase();
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirmPassword").value;
    let message = document.getElementById("message");

    message.innerHTML = "";
    message.style.color = "red";

    if (!username || !email || !password || !confirm) {
        message.innerHTML = "Fill all fields.";
        return;
    }

    if (password.length < 8 || !/\d/.test(password)) {
        message.innerHTML = "Password must be 8+ characters and contain 1 number.";
        return;
    }

    if (password !== confirm) {
        message.innerHTML = "Passwords do not match.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    for (let user of users) {
        if (user.username.toLowerCase() === username.toLowerCase() ||
            user.email.toLowerCase() === email) {

            message.innerHTML = "User already exists.";
            return;
        }
    }

    let hash = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(password)
    );

    let hashedPassword = Array.from(new Uint8Array(hash))
        .map(num => num.toString(16).padStart(2, "0"))
        .join("");

    users.push({
        username,
        email,
        password: hashedPassword
    });

    localStorage.setItem("users", JSON.stringify(users));

    message.style.color = "green";
    message.innerHTML = "Registration Successful!";

    setTimeout(function () {
        location.href = "index.html";
    }, 1500);

});