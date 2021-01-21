const avatarPresentation = document.getElementById("avatar_presentation");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const nomError = document.getElementById("nomHelp");
const prenomError = document.getElementById("prenomHelp");
const formAvatar = document.getElementById("form_avatar");
const submitAvatar = document.getElementById("form_submit_avatar");
const formInfos = document.getElementById("form_infos");
const submitInfos = document.getElementById("form_submit_infos");
const formPassword = document.getElementById("form_password");
const submitPassword = document.getElementById("form_submit_password");
const passwordConfirm = document.getElementById("password_confirm");
const passwordConfirmError = document.getElementById("passwordHelp_confirm");
const role = sessionStorage.getItem("role");
const section = document.getElementById("section")
const presentation = document.getElementById("presentation")

if (role === "admin") {
    // DEBUT SECTION AFFICHAGE DE L'ENSEMBLE DES UTILISATEURS //
    presentation.remove(presentation);
    allUsersInfos("http://localhost:3000/api/auth/all_users")
        .then(response => {
            let div = document.createElement("div");
            div.classList.add("container");
            section.prepend(div);
            let table = document.createElement("table");
            table.classList.add("table-responsive-sm", "table", "table-striped");
            div.prepend(table);
            let tr = document.createElement("tr");
            tr.classList.add("text-center");
            table.prepend(tr);
            tr.innerHTML= "<th scope='col' class='px-1'>user_Id</th><th scope='col' class='px-1'>Nom</th><th scope='col' class='px-1'>Prenom</th><th scope='col' class='px-1'>Email</th><th scope='col'>Supprimer</th>"
            let tbody = document.createElement("tbody");
            table.append(tbody)
            response.forEach(result => {
                let tr = document.createElement("tr");
                tr.classList.add("text-center");
                tbody.append(tr);
                let user_id = "<td>" + result.id + "</td>";
                let nomUser = "<td>" + result.nom + "</td>";
                let prenomUser = "<td>" + result.prenom + "</td>";
                let emailUser = "<td>" + result.email + "</td>";
                let deleteUser = "<td><button class='fas fa-times btn btn-danger' id='delete_user" + result.id + "'></button></td>";
                tr.innerHTML = user_id + nomUser + prenomUser + emailUser + deleteUser;

                document.getElementById("delete_user" + result.id).addEventListener("click", () => {
                    const deleteUserId = {
                        id: result.id
                    };
                    adminDeleteUser("http://localhost:3000/api/auth/user", deleteUserId)
                        .then(() => {
                            document.location.reload()
                        })
                        .catch((error) => {console.error(error, "Problème de communication avec l'API")})
                })
            })
        })
        .catch((error) => {console.error(error, "Problème de communication avec l'API")})
    // FIN SECTION AFFICHAGE DE L'ENSEMBLE DES UTILISATEURS //
}
else {
    // DEBUT SECTION AFFICHAGE DE L'ENSEMBLE DES INFOS DU PROFIL //
    oneUser("http://localhost:3000/api/auth/profil")
        .then(response => {
            let img = document.createElement("img");
            img.id = "avatar_profil"
            img.alt="Avatar de profil";
            avatarPresentation.prepend(img);
            const avatarProfil = document.getElementById("avatar_profil");
            // Affichage de l'ensemble des infos de l'utilisateur
            avatarProfil.src = response[0].avatar;
            nom.value = response[0].nom;
            prenom.value = response[0].prenom;
            email.value = response[0].email;
            submitInfos.disabled = true;
            submitPassword.disabled = true;

            // DEBUT SECTION AVATAR //
            let div = document.createElement("div");
            avatarPresentation.prepend(div);
            let i = true;
            // DEBUT SECTION MODIFICATION AVATAR //
            submitAvatar.addEventListener("click", () => {
                let avatarValue = [];
                if (i === true) {
                    img.remove(img);
                    chooseAvatar("http://localhost:3000/api/auth/avatars")
                        .then(responseAvatar => {
                            avatarProfil.remove(avatarProfil);
                            responseAvatar.forEach(avatar => {
                                let input = document.createElement("button");
                                input.classList.add("p-0", "m-1", "border-0", "rounded")
                                input.value = avatar;
                                input.id = avatar.replace(/.png/, "");
                                input.innerHTML = "<img src='../Backend/images/avatars/" + avatar + "' alt='Avatar de profil'>";
                                div.prepend(input);
                                
                                // Au clic on selectionne un avatar et on renvoie sa valeur
                                document.getElementById(input.id).addEventListener("click", (event) => {
                                    event.preventDefault();
                                    avatarValue = [];
                                    console.log(input.value)
                                    avatarValue.push(input.value);
                                    const avatarModified = {
                                        avatar: avatarValue[0],
                                        id: sessionStorage.getItem("userId")
                                    }
                                    document.getElementById(input.id).classList.replace("border-0", "border");
                                    modifyAvatar("http://localhost:3000/api/auth/avatars", avatarModified)
                                        .then(() => {
                                            document.location.reload();
                                        })
                                        .catch((error) => {console.error(error, "Problème de communication avec l'API")});
                                });
                            });
                            i = false;
                        })
                        .catch((error) => {
                            console.log(error, "Problème de communication avec l'API");
                        });
                }
                else {
                    div.remove(div);
                    img.remove(img);
                    img = document.createElement("img");
                    img.id = "avatar_profil"
                    img.src = response[0].avatar;
                    img.alt="Avatar de profil";
                    avatarPresentation.prepend(img);
                    div = document.createElement("div");
                    avatarPresentation.prepend(div);
                    i = true;
                }
            })
            // FIN SECTION MODIFICATION AVATAR //
            //FIN SECTION AVATAR //
        })
        .catch((error) => {console.error(error, "Problème de communication avec l'API")});
    // FIN SECTION AFFICHAGE DE L'ENSEMBLE DES INFOS DU PROFIL //

    // DEBUT SECTION MODIFICATION INFOS //
    formInfos.addEventListener("keyup", () => {
        submitInfos.disabled = false;
        submitInfos.addEventListener("click", (event) => {
            event.preventDefault();
            const userModified = {
                nom: nom.value,
                prenom: prenom.value,
                email: email.value
            }
            if ((nameRegex.test(nom.value) === true) && (nameRegex.test(prenom.value) === true) && (emailRegex.test(email.value) === true)) {
                modifyUserInfos("http://localhost:3000/api/auth/modify_infos", userModified)
                    .then(() => {
                            document.location.reload();
                    })
                    .catch((error) => {console.error(error, "Problème de communication avec l'API")})
            }
            else {
                errorInfos(nom, prenom, email, nomError, prenomError, emailError, "Nom incorrect", "Prenom incorrect", "Email incorrect ou n'appartenant pas à Groupomania");
            }
        })
    });
    // FIN SECTION MODIFICATION INFOS //

    // DEBUT SECTION MODIFICATION PASSWORD //
    formPassword.addEventListener("keyup", () => {
        submitPassword.disabled = false;
        submitPassword.addEventListener("click", (event) => {
            event.preventDefault();
            const passwordModified = {
                password: password.value
            }
            if ((password.value === passwordConfirm.value) && (passwordRegex.test(password.value) === true)) {
                modifyUserPassword("http://localhost:3000/api/auth/modify_password", passwordModified)
                    .then(() => {
                            document.location.reload();
                    })
                    .catch((error) => {console.error(error, "Problème de communication avec l'API")})
            }
            else {
                errorInput(password, passwordError, "Veuillez entrer un mot de passe contenant au moins 6 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 des caractères spéciaux");
                errorInput(passwordConfirm, passwordConfirmError, "Votre mot de passe doit être identique");
            }
        });
    });
    // FIN SECTION MODIFICATION PASSWORD //

    // DEBUT SECTION SUPPRESSION COMPTE //
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
    // FIN SECTION SUPPRESSION COMPTE //
}

// Déconnexion
const logout = () => {
    document.getElementById("logout").addEventListener("click", () => {
        sessionStorage.clear();
    });
};
logout();