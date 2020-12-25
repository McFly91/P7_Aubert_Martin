let idUrl = new URLSearchParams(document.location.search);
let url = "http://localhost:3000/api/post/" + idUrl.get("id");

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
        console.log(error);
    };
};

const dateCalcul = (date_creation) => {
    let dateNow = Date.now();
    let dateCreation = Date.parse(date_creation);
    let dateDiff = dateNow - dateCreation;
    let date;
    if (dateDiff > (60000*60) && dateDiff < (60000*60*24)) {
        return date = "Il y a " + Math.round(dateDiff / (60000*60)) + " Heures";
    }
    else if (dateDiff < (60000*60)) {
        return date = "Il y a " + Math.round(dateDiff / 60000) + " Minutes";
    }
    else {
        return date = "Il y a " + Math.round(dateDiff / (60000*60*24)) + " Jours"
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

onePost(url)
    .then(post => {
        console.log(post);
        let ul = document.createElement("ul");
        ul.classList.add("container","px-0", "col-lg-6", "list-group", "one_post");
        document.getElementById("one_post").append(ul);
        let li = document.createElement("li");
        li.classList.add("list-group-item", "bg-light");
        document.querySelector(".one_post").prepend(li);
        let userHtml = "<h6>" + post[0].prenom + " " + post[0].nom + "</h6>";
        let datePostHtml = "<p class='font-italic'>" + dateCalcul(post[0].date_post) + "</p>";
        let titreHtml = "<h5 class='card-title font-weight-bold'>" + post[0].titre + "</h5>";
        let contenu_textHtml = "<p class='card-text'>" + post[0].contenu_text + "</p>";
        let idCommentaireHtml = post[0].id;
        let commentairesHtml = "<p class='btn btn-primary'>Commentaires <span class='badge bg-secondary' id='" + idCommentaireHtml + "'></p>";

        allComment("http://localhost:3000/api/post/" + post[0].id + "/comment")
        .then(responseComment => {
            let ul = document.createElement("ul");
            ul.classList.add("container","px-0", "col-lg-6", "list-group", "all_comment");
            document.getElementById("one_post").append(ul);
            responseComment.forEach(comment => {
                document.getElementById(post[0].id).textContent = responseComment.length;
                let li = document.createElement("li");
                li.classList.add("list-group-item", "bg-light");
                document.querySelector(".all_comment").prepend(li);
                let userCommentHtml = "<div class='card-header'><h6>" + comment.prenom + " " + comment.nom + "</h6></div>";
                let commentPostHtml = "<div class='card-body'><p>" + comment.comment_post + "</p></div>";
                li.innerHTML = "<div class='card'>" + userCommentHtml + commentPostHtml + "</div>";
            })
        })
        .catch((error) => {
            console.log(error, "Problème de communication avec l'API");
        })

        let likeDislikeHtml = "<p class='m-1'><a class='fas fa-thumbs-up fa-2x pr-2'></a><a class='fas fa-thumbs-down fa-2x align-middle' style='text-decoration:none'></a></p>";
        let cardHeader = "<div class='card-header d-flex justify-content-between'>" + userHtml + datePostHtml + "</div>";
        let cardBody = "<div class='card-body px-0 py-0'>" + titreHtml + "</div>";
        let cardBodyText = "<div class='card-body px-0 py-0'>" + titreHtml + contenu_textHtml + "</div>";
        let cardImg = "<p class='text-center'><img class='card-img-bottom py-2 w-25' src=" + post[0].contenu_media + " alt='media post'></p>";
        let cardFooter = "<div class='card-footer text-muted d-flex justify-content-between py-0'>" + commentairesHtml + likeDislikeHtml + "</div>";
        if (post[0].contenu_text !== null && post[0].contenu_media !== null) {
            li.innerHTML = "<div class='card'>" + cardHeader + cardBodyText + cardImg + cardFooter + "</div>";
        }
        else if (post[0].contenu_media !== null) {
            li.innerHTML = "<div class='card'>" + cardHeader + cardBody + cardImg + cardFooter + "</div>";
        }
        else {
            li.innerHTML = "<div class='card'>" + cardHeader + cardBodyText + cardFooter + "</div>";
        }
    })
    .catch((error) => {
        console.log(error, "Problème de communication avec l'API");
    });