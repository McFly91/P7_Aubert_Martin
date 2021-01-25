const profile = document.getElementById("profile");

profile.addEventListener("click", () => {
    if (sessionStorage.getItem("token")) {
        profile.href = "../profile.html"
    }
    else {
        profile.href = "../login_user.html"
    }
});