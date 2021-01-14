const form = document.getElementById("form");
const submit = document.getElementById("form_submit");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const nomError = document.getElementById("nomHelp");
const prenomError = document.getElementById("prenomHelp");
const passwordConfirm = document.getElementById("password_confirm");
const passwordConfirmError = document.getElementById("passwordHelp_confirm");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const idUser = {
        nom: nom.value,
        prenom: prenom.value,
        email: email.value,
        email_mask: email.value,
        password: password.value
    }

    if (password.value === passwordConfirm.value){
        createUser("http://localhost:3000/api/auth/signup", idUser)
        .then(response => {
            if (response.status === 201 && password.value === passwordConfirm.value) {
                window.location.href = "index.html";
            }
            else {
                errorInfos(nom, prenom, email, nomError, prenomError, emailError, "Nom incorrect", "Prenom incorrect", "Email incorrect ou n'appartenant pas à Groupomania");
                errorInput(password, passwordError, "Veuillez entrer un mot de passe contenant au moins 6 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 des caractères spéciaux");
            }
        })
        .catch((error) => {
            console.log(error, "Problème de communication avec l'API");
        });
    }
    else {
        errorInput(passwordConfirm, passwordConfirmError, "Votre mot de passe doit être identique");
    }

});