const form = document.getElementById("form");
const inputs = document.getElementsByClassName("form-control");
const submit = document.getElementById("form_submit");
const errorInformation = document.getElementsByClassName("text-muted");

const requestServer = async (url, data) => {
    try {
        let response = await fetch(url, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(data)
        })
        console.log(response)
        let dataJson = await response.json();
        if (response.status === 200) {
            return dataJson
        }
        else {
            console.log(dataJson.error);
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].style.border = "2px solid #dc3545";
                errorInformation[i].textContent = dataJson.error;
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
    requestServer("http://localhost:3000/api/auth/login", idLogin)
        .then(response => {
                sessionStorage.setItem("token", response.token);
                window.location.href = "user_page.html";
        })
        .catch(error => console.error(error))
});