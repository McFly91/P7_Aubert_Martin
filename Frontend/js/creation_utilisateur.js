let form = document.getElementById("form");
let inputs = document.getElementsByClassName("form-control");
let submit = document.getElementById("form_submit");

//window.onload = () => submit.disabled = true;

const createUser = (nom, prenom, email, email_mask, password) => {
    try {
        // On crée une Promesse qui va se résoudre si la connexion avec l'API est OK ou retourner une erreur dans le cas contraire /
        return new Promise ((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("POST", "http://localhost:3000/api/auth/signup");
            request.onreadystatechange = function () {
                    if (this.status === 201) {
                        //let response = JSON.parse(this.responseText);
                        request.onload = () => resolve (this.statusText);
                    }
                    else {
                        request.onerror = () => reject(this.statusText);
                    }
            };
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify({nom, prenom, email, email_mask, password}));
        });
    }
    catch (error) {
            console.log(error);
    };
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let email = document.getElementById("email").value;
    let email_mask = email;
    let password = document.getElementById("password").value;
    let password_confirm = document.getElementById("password_confirm").value;

    if (password === password_confirm) {
        createUser(nom, prenom, email, email_mask, password)
        .then(window.location.href = "index.html", console.log("Utilisateur créé"))
        .catch((error) => {
            console.log(error, "Problème de communication avec l'API");
        });
    }
    else {
        alert("Erreur dans la saisie de votre mot de passe, il doit être identique !")
    };
});
