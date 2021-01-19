const form = document.getElementById("form");
const submit = document.getElementById("form_submit");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const nomError = document.getElementById("nomHelp");
const prenomError = document.getElementById("prenomHelp");
const passwordConfirm = document.getElementById("password_confirm");
const passwordConfirmError = document.getElementById("passwordHelp_confirm");

// DEBUT SECTION AVATAR //
// Tableau qui stock la valeur de l'avatar avec une valeur par défaut
let avatarValue = ["avatar1.png"];

// Affichage de l'ensemble des avatars
chooseAvatar("http://localhost:3000/api/auth/avatars")
    .then(response => {
        response.forEach(avatar => {
            let input = document.createElement("button");
            input.classList.add("p-0", "m-1", "border-0", "rounded")
            input.value = avatar;
            input.id = avatar.replace(/.png/, "");
            input.innerHTML = "<img src='../Backend/images/avatars/" + avatar + "' alt='Avatar de profil'>";
            document.getElementById("avatars").prepend(input);
            
            // Avatar selectionné par défaut
            if(avatarValue[0] === "avatar1.png") {
                document.getElementById("avatar1").classList.replace("border-0", "border");
            };

            // Au clic on selectionne un avatar et on renvoie sa valeur
            document.getElementById(input.id).addEventListener("click", (event) => {
                event.preventDefault();
                avatarValue = [];
                avatarValue.push(input.value);
                document.getElementById(input.id).classList.replace("border-0", "border");
                console.log(avatarValue);
            });
        });
    })
    .catch((error) => {
        console.log(error, "Problème de communication avec l'API");
    });
// FIN SECTION AVATAR //

// DEBUT SECTION FORMULAIRE D'ENREGISTREMENT //
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const idUser = {
        nom: nom.value,
        prenom: prenom.value,
        email: email.value,
        email_mask: email.value,
        password: password.value,
        avatar: avatarValue[0]
    }

    if (password.value === passwordConfirm.value) {
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
// FIN SECTION FORMULAIRE D'ENREGISTREMENT //