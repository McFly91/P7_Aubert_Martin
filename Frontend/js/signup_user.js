const form = document.getElementById("form");
const submit = document.getElementById("form_submit");
const inputNom = document.getElementById("nom");
const inputPrenom = document.getElementById("prenom");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

const createUser = async (url, data) => {
    try {
        let response = await fetch(url, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        let responseJson = await response.json();

        if (response.status === 201) {
            return response
        }
        else {
            return responseJson
        } 
    }
    catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const idUser = {
        nom: document.getElementById("nom").value,
        prenom: document.getElementById("prenom").value,
        email: document.getElementById("email").value,
        email_mask: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    let password_confirm = document.getElementById("password_confirm").value;

    if (idUser.password === password_confirm) {
        createUser("http://localhost:3000/api/auth/signup", idUser)
            .then(response => {
                console.log(response, response.ok, response.error)
                if (response.status === 201) {
                    window.location.href = "index.html"; 
                    console.log("Utilisateur créé");
                }
                else if (response.error === "Nom incorrect !") {
                    inputNom.classList.add("is-invalid");
                    let errorInfo = document.getElementById("nomHelp");
                    errorInfo.textContent = response.error;
                    form.addEventListener("keyup", () => {
                        inputNom.classList.remove("is-invalid");
                    })
                }
                else if (response.error === "Prénom incorrect !") {
                    inputPrenom.classList.add("is-invalid");
                    let errorInfo = document.getElementById("prenomHelp");
                    errorInfo.textContent = response.error;
                    form.addEventListener("keyup", () => {
                        inputPrenom.classList.remove("is-invalid");
                    });
                }
                else if (response.error === "Email incorrect !") {
                    inputEmail.classList.add("is-invalid");
                    let errorInfo = document.getElementById("emailHelp");
                    errorInfo.textContent = response.error;
                    form.addEventListener("keyup", () => {
                        inputEmail.classList.remove("is-invalid");
                    });
                }
                else if (response.error === "Veuillez entrer un mot de passe contenant au moins 6 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 des caractères spéciaux !") {
                    inputPassword.classList.add("is-invalid");
                    let errorInfo = document.getElementById("passwordHelp");
                    errorInfo.textContent = response.error;
                    form.addEventListener("keyup", () => {
                        inputPassword.classList.remove("is-invalid");
                    });
                }
            })
            .catch((error) => {
                console.log(error, "Problème de communication avec l'API");
            });
    }
    else {
        alert("Erreur dans la saisie de votre mot de passe, il doit être identique !")
    };
});