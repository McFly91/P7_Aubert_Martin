const form = document.getElementById("form");
const inputs = document.getElementsByClassName("form-control");
const submit = document.getElementById("form_submit");
const errorInfo = document.getElementsByClassName("text-muted");

const loginUser = async (url, data) => {
    try {
        let response = await fetch(url, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(data)
        })
        let responseJson = await response.json();
        console.log(responseJson)
        if (response.status === 200) {
            return responseJson
        }
        else {
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].style.border = "2px solid #dc3545";
                errorInfo[i].textContent = responseJson.error;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const idLogin = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    loginUser("http://localhost:3000/api/auth/login", idLogin)
        .then(response => {
                sessionStorage.setItem("token", response.token);
                sessionStorage.setItem("userId", response.userId);
                sessionStorage.setItem("role", response.role);
                window.location.href = "user_page.html";
        })
        .catch(error => console.error(error))
});