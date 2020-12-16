let form = document.getElementById("form");
let inputs = document.getElementsByClassName("form-control");
let submit = document.getElementById("form_submit");

async function requestServer(url, data) {
    let response = await fetch(url, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
    })
    let dataJson = await response.json();
    return dataJson
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const idLogin = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    console.log(idLogin);
    requestServer("http://localhost:3000/api/auth/login", idLogin)
        .then(response => {
            if (response.status === 401) {
                console.log(error)
            }
            else if (response.status === 200) {
                const user = JSON.stringify(response);
                console.log(user);
                sessionStorage.setItem("token", response.token);
                window.location.href = "user_page.html";
            }
        })
        .catch(error => console.log(error))
});