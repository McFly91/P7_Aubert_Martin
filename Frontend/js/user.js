// VARIABLES COMMUNES //
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.getElementById("emailHelp");
const passwordError = document.getElementById("passwordHelp");
// VARIABLES COMMUNES //

// USER //
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

const chooseAvatar = async (url) => {
    try {
        let response = await fetch(url, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        let responseJson = await response.json();
        if (response.status === 200) {
            return responseJson
        }
        else {
            throw error
        }
    }
    catch (error) {
        console.error(error);
    };
};

const loginUser = async (url, data) => {
    try {
        let response = await fetch(url, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        let responseJson = await response.json();
        console.log(responseJson)
        if (response.status === 200) {
            return responseJson
        }
        else {
            return response
        }
    }
    catch (error) {
        console.log(error);
    }
};

const oneUser = async (url) => {
    try {
        let response = await fetch(url, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
        })
        let responseJson = await response.json();
        if (response.status === 200) {
            return responseJson
        }
        else {
            throw error
        }
    }
    catch (error) {
        console.error(error);
    };
};

const modifyUserInfos = async (url, data) => {
    try {
        let response = await fetch(url, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(data)
        })
        let responseJson = await response.json();

        if (response.status === 200) {
            return response
        }
        else {
            return responseJson
        }
    }
    catch (error) {
        console.error(error);
    };
};

const modifyUserPassword = async (url, data) => {
    try {
        let response = await fetch(url, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(data)
        })
        let responseJson = await response.json();

        if (response.status === 200) {
            return response
        }
        else {
            return responseJson
        }
    }
    catch (error) {
        console.error(error);
    };
};

const deleteUser = async (url) => {
    try {
        let response = await fetch(url, {
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
        })
        let responseJson = await response.json();
        if (response.status === 200) {
            return responseJson
        }
        else {
            return responseJson.error
        }
    }
    catch (error) {
        console.log(error);
    };
};
// USER //

// ERREURS DANS LES ENTREES //
const emailRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>A-Z0-9]*([a-z]){1,}([a-zA-Z0-9]){2,}\@(groupomania.com|groupomania.fr)/;
const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
const nameRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>]*[A-Za-z]{2,}[^@&()!_$*€£`+=\/;?#<>]*$/;

const errorInput = (input, error, text) => {
    input.classList.add("is-invalid");
    error.classList.add("text-danger");
    error.textContent = text;
    input.addEventListener("keyup", () => {
        input.classList.remove("is-invalid");
        error.textContent = "";
    })
};

const errorInfos = (nom, prenom, email, nomError, prenomError, emailError, textNomError, textPrenomError, textEmailError) => {
    if (nameRegex.test(nom.value) === false && nameRegex.test(prenom.value) === false && emailRegex.test(email.value) === false) {
        errorInput(nom, nomError, textNomError);
        errorInput(prenom, prenomError, textPrenomError);
        errorInput(email, emailError, textEmailError)
    }
    else if (nameRegex.test(nom.value) === false && nameRegex.test(prenom.value) === false) {
        errorInput(nom, nomError, textNomError);
        errorInput(prenom, prenomError, textPrenomError);
    }
    else if (nameRegex.test(nom.value) === false && emailRegex.test(email.value) === false) {
        errorInput(nom, nomError, textNomError);
        errorInput(email, emailError, textEmailError);
    }
    else if (nameRegex.test(prenom.value) === false && emailRegex.test(email.value) === false) {
        errorInput(prenom, prenomError, textPrenomError);
        errorInput(email, emailError, textEmailError);
    }
    else if (nameRegex.test(nom.value) === false) {
        errorInput(nom, nomError, textNomError);
    }
    else if (nameRegex.test(prenom.value) === false) {
        errorInput(prenom, prenomError, textPrenomError);
    }
    else if (emailRegex.test(email.value) === false) {
        errorInput(email, emailError, textEmailError);
    }
}
// ERREURS DANS LES ENTREES //