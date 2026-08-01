const form = document.getElementById("loginForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    let loginUser = document.getElementById("loginUser").value.trim().toLowerCase();
    let password = document.getElementById("loginPassword").value;
    let message = document.getElementById("loginMessage");

    message.innerHTML = "";
    message.style.color = "red";

    if (!loginUser || !password) {
        message.innerHTML = "Please fill all fields.";
        return;
    }

    let hash = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(password)
    );

    let hashedPassword = Array.from(new Uint8Array(hash))
        .map(x => x.toString(16).padStart(2, "0"))
        .join("");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let foundUser = null;

    users.forEach(function(user) {

        if (
            (user.username.toLowerCase() == loginUser ||
             user.email.toLowerCase() == loginUser) &&
             user.password == hashedPassword
        ) {
            foundUser = user;
        }

    });

    if (foundUser == null) {
        message.innerHTML = "Invalid Username or Password.";
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

    location.href = "dashboard.html";

});