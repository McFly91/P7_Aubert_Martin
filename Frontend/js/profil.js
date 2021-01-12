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

oneUser("http://localhost:3000/api/auth/profil")
    .then(response => {
        document.getElementById("avatar").src = "./images/avatars/avatar1.png"
        document.getElementById("nom").value = response[0].nom;
        document.getElementById("prenom").value = response[0].prenom;
        document.getElementById("email").value = response[0].email;
    })
    .catch((error) => {console.error(error, "Problème de communication avec l'API")});