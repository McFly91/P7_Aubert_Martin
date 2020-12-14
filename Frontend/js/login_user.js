let form = document.getElementById("form");
let inputs = document.getElementsByClassName("form-control");
let submit = document.getElementById("form_submit");

const loginUser = (email, password) => {
    try {
        // On crée une Promesse qui va se résoudre si la connexion avec l'API est OK ou retourner une erreur dans le cas contraire /
        return new Promise ((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("POST", "http://localhost:3000/api/auth/login");
            request.onreadystatechange = function () {
                    if (this.status === 200) {
                        let response = JSON.parse(this.responseText);
                        console.log(response.userId, response.token);
                        request.onload = () => this.statusText;
                        resolve (response.token)
                    }
                    else {
                        request.onerror = () => reject(this.statusText);
                    }
            };
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify({email, password}));
        });
    }
    catch (error) {
            console.log(error);
    };
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    loginUser(email, password)
        .then(window.location.href = "user_page.html", console.log("Utilisateur connecté", response.token))
        .catch((error) => {
            console.log(error, "Problème de communication avec l'API");
    });
});