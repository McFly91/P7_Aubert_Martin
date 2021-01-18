const avatar = document.getElementById("avatar");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const nomError = document.getElementById("nomHelp");
const prenomError = document.getElementById("prenomHelp");
const formInfos = document.getElementById("form_infos");
const submitInfos = document.getElementById("form_submit_infos");
const formPassword = document.getElementById("form_password");
const submitPassword = document.getElementById("form_submit_password");
const passwordConfirm = document.getElementById("password_confirm");
const passwordConfirmError = document.getElementById("passwordHelp_confirm");

oneUser("http://localhost:3000/api/auth/profil")
    .then(response => {
        avatar.src = response[0].avatar;
        nom.value = response[0].nom;
        prenom.value = response[0].prenom;
        email.value = response[0].email;
        submitInfos.disabled = true;
    })
    .catch((error) => {console.error(error, "Problème de communication avec l'API")});

formInfos.addEventListener("keyup", () => {
    submitInfos.disabled = false;
    submitInfos.addEventListener("click", (event) => {
        event.preventDefault();
        const userModified = {
            nom: nom.value,
            prenom: prenom.value,
            email: email.value
        }
        modifyUserInfos("http://localhost:3000/api/auth/modify_infos", userModified)
            .then(responseUserModified => {
                if (responseUserModified.status === 200) {
                    document.location.reload();
                }
                else {
                    errorInfos(nom, prenom, email, nomError, prenomError, emailError, "Nom incorrect", "Prenom incorrect", "Email incorrect ou n'appartenant pas à Groupomania");
                }
            })
            .catch((error) => {console.error(error, "Problème de communication avec l'API")})
    })
});

submitPassword.addEventListener("click", (event) => {
    event.preventDefault();
    const passwordModified = {
        password: password.value
    }
    if (password.value === passwordConfirm.value){
        modifyUserPassword("http://localhost:3000/api/auth/modify_password", passwordModified)
            .then(responsePasswordModified => {
                if (responsePasswordModified.status === 200) {
                    document.location.reload();
                }
                else {
                    errorInput(password, passwordError, "Veuillez entrer un mot de passe contenant au moins 6 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 des caractères spéciaux");
                }
            })
            .catch((error) => {console.error(error, "Problème de communication avec l'API")})
    }
    else {
        errorInput(passwordConfirm, passwordConfirmError, "Votre mot de passe doit être identique");
    }
});

document.getElementById("delete").addEventListener("click", () => {
    let confirmDelete = confirm("Etes vous sur de vouloir supprimer votre compte ?");
    if (confirmDelete === true) {
        deleteUser("http://localhost:3000/api/auth/profil")
            .then(() => {
                sessionStorage.clear();
                document.location.href = "index.html";
            })
            .catch((error) => {console.error(error, "Problème de communication avec l'API")})
    }
});

// Déconnexion
const logout = () => {
    document.getElementById("logout").addEventListener("click", () => {
        sessionStorage.clear();
    });
};
logout();