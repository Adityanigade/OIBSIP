let user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    location.href = "index.html";
}

let welcome = document.getElementById("welcomeUser");
welcome.innerHTML = "Hello, " + user.username + " 👋";

let logout = document.getElementById("logoutBtn");

logout.onclick = function () {
    localStorage.removeItem("loggedInUser");
    location.href = "index.html";
};