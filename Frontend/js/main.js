// POSTS //
const newPostWithoutMedia = async (url, data) => {
    try {
        let response = await fetch(url, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
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
        console.error(error);
    };
};

const newPostWithMedia = async (url, data) => {
    try {
        let response = await fetch(url, {
            method:"POST",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: data
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
        console.error(error);
    };
};

const modifyPostWithoutMedia = async (url, data) => {
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

const modifyPostWithMedia = async (url, data) => {
    try {
        let response = await fetch(url, {
            method:"PUT",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: data
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

const onePost = async (url) => {
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

const allPost = async (url) => {
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
        else if (response.status === 401) {
            document.location = "../index.html";
        }
        else {
            throw error
        }
    }
    catch (error) {
        console.error(error);
    };
};

const deleteOnePost = async (url) => {
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
// POSTS //

// COMMENTAIRES //
const newComment = async (url, data) => {
    try {
        let response = await fetch(url, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
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
    };
};

const modifyComment = async (url, data) => {
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
        console.log(error);
    };
};

const allComment = async (url) => {
    try {
        let response = await fetch(url, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
        })
        let responseJson = await response.json();
        console.log(response)
        if (response.status === 200) {
            return responseJson
        }
        else {
            throw error
        }
    }
    catch (error) {
        console.log(error);
    };
};

const deleteOneComment = async (url) => {
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
// COMMENTAIRES //

// LIKES / DISLIKES //
const addLikeDislike = async (url, data) => {
    try {
        let response = await fetch(url, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(data)
        })
        let responseJson = await response.json();
        console.log(response, responseJson)
        if (response.status === 200) {
            return responseJson
        }
        else {
            return responseJson.error
        }
    }
    catch (error) {
        console.error(error);
    };
};

const allLikeDislike = async (url) => {
    try {
        let response = await fetch(url, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
        })
        let responseJson = await response.json();
        console.log(response, responseJson)
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
// LIKES / DISLIKES //

// ERREURS DANS LES ENTREES //
const inputRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>]*[A-Za-z0-9]{1,}/;

const errorInput = (input, error, text) => {
    input.classList.add("is-invalid");
    error.classList.add("text-danger");
    error.textContent = text;
    input.addEventListener("keyup", () => {
        input.classList.remove("is-invalid");
        error.textContent = "";
    })
};

const errorInputMedia = (input, inputText, error, text) => {
    input.classList.add("is-invalid");
    error.classList.add("text-danger");
    error.textContent = text;
    input.addEventListener("change", () => {
        inputText.classList.remove("is-invalid");
        error.textContent = "";
    })
};

const errorInfosMedia = (titre, contenuText, contenu, image, titreError, contenuError, textTitreError, textContenuError) => {
    if ((inputRegex.test(titre.value) === false) && ((contenuText.value === "") && (image === undefined))) {
        errorInput(titre, titreError, textTitreError);
        errorInput(contenuText, contenuError, textContenuError);
        errorInputMedia(contenu, contenuText, contenuError, textContenuError);
    }
    else if ((inputRegex.test(titre.value) === false) && (((contenuText.value !== "") && (inputRegex.test(contenuText.value) === false)) && (image === undefined))) {
        errorInput(titre, titreError, textTitreError);
        errorInput(contenuText, contenuError, textContenuError);
        errorInputMedia(contenu, contenuText, contenuError, textContenuError);
    }
    else if (((contenuText.value !== "") && (inputRegex.test(contenuText.value) === false)) && (image === undefined)) {
        errorInput(contenuText, contenuError, textContenuError);
        errorInputMedia(contenu, contenuText, contenuError, textContenuError);
    }
    else if ((contenuText.value === "") && (image === undefined)) {
        errorInputMedia(contenu, contenuText, contenuError, textContenuError);
    }
    else if (inputRegex.test(titre.value) === false) {
        errorInput(titre, titreError, textTitreError);
    }
}

const errorInfos = (titre, contenu, titreError, contenuError, textTitreError, textContenuError) => {
    if ((inputRegex.test(titre.value) === false) && (inputRegex.test(contenu.value) === false)) {
        errorInput(titre, titreError, textTitreError);
        errorInput(contenu, contenuError, textContenuError);
    }
    else if (inputRegex.test(contenu.value) === false) {
        errorInput(contenu, contenuError, textContenuError);
    }
    else if (inputRegex.test(titre.value) === false) {
        errorInput(titre, titreError, textTitreError);
    }
}
// ERREURS DANS LES ENTREES //

// CALCUL TEMPS DEPUIS CREATION //
const dateCalcul = (date_creation) => {
    let dateNow = Date.now();
    let dateCreation = Date.parse(date_creation);
    let dateDiff = dateNow - dateCreation;
    let date;
    if (dateDiff < (60000*1)) {
        return date = "Il y a moins d'une minute";
    }
    else if (dateDiff > (60000*1) && dateDiff < (60000*2)) {
        return date = "Il y a 1 minute";
    }
    else if (dateDiff > (60000*2) && dateDiff < (60000*60)) {
        return date = "Il y a " + Math.round(dateDiff / 60000) + " minutes";
    }
    else if (dateDiff > (60000*60) && dateDiff < (60000*60*2)) {
        return date = "Il y a 1 heure";
    }
    else if (dateDiff > (60000*60*2) && dateDiff < (60000*60*24)) {
        return date = "Il y a " + Math.round(dateDiff / (60000*60)) + " heures";
    }
    else if (dateDiff > (60000*60*24) && dateDiff < (60000*60*24*2)) {
        return date = "Il y a 1 jour"
    }
    else {
        return date = "Il y a " + Math.round(dateDiff / (60000*60*24*2)) + " jours"
    };
};
// CALCUL TEMPS DEPUIS CREATION //

// DECONNEXION //
const logout = () => {
    document.getElementById("logout").addEventListener("click", () => {
        sessionStorage.clear();
    });
};
// DECONNEXION //