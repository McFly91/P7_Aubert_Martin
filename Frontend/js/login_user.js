const form = document.getElementById("form");
const submit = document.getElementById("form_submit");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const idLogin = {
        email: email.value,
        password: password.value
    };
    loginUser("http://localhost:3000/api/auth/login", idLogin)
        .then(response => {
            if (response.token !== undefined) {
                sessionStorage.setItem("token", response.token);
                sessionStorage.setItem("userId", response.userId);
                sessionStorage.setItem("role", response.role);
                window.location.href = "user_page.html";
            }
            else {
                errorInput(email, emailError, "Email ou mot de passe incorrect");
                errorInput(password, passwordError, "Email ou mot de passe incorrect");
            }
        })
        .catch(error => console.error(error))
});