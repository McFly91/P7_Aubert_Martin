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

onePost(url)
    .then(post => {
        console.log(post);
        let ul = document.createElement("ul");
        ul.classList.add("container","px-0", "col-lg-6", "list-group", "one_post");
        document.getElementById("one_post").append(ul);
        let li = document.createElement("li");
        li.classList.add("list-group-item", "bg-light", "pb-0");
        document.querySelector(".one_post").prepend(li);
        let userHtml = "<h6>" + post[0].prenom + " " + post[0].nom + "</h6>";
        let datePostHtml = "<p class='font-italic'>" + dateCalcul(post[0].date_post) + "</p>";
        let titreHtml = "<h5 class='card-title font-weight-bold'>" + post[0].titre + "</h5>";
        let contenu_textHtml = "<p class='card-text'>" + post[0].contenu_text + "</p>";
        let commentairesHtml = "<p class='btn btn-primary mb-4'>Commentaires <span class='badge bg-secondary' id='" + post[0].id + "'></p>";
        let cardHeader = "<div class='card-header d-flex justify-content-between'>" + userHtml + datePostHtml + "</div>";
        let likeHtml = "<p><a class='fas fa-thumbs-up fa-2x pr-2' id='like'></a><span id='nb_like' class='pr-1'></span></p>";
        let dislikeHtml = "<p class='pt-2'><a class='fas fa-thumbs-down fa-2x align-middle' style='text-decoration:none' id='dislike'></a> <span id='nb_dislike' class='pr-1'></span></p>";
        let likeDislikeHtml = "<div class='d-flex m-1'>" + likeHtml + dislikeHtml + "</div>";
        let cardBody = "<div class='card-body px-0 py-0'>" + titreHtml + "</div>";
        let cardBodyText = "<div class='card-body px-0 py-0'>" + titreHtml + contenu_textHtml + "</div>";
        let cardImg = "<p class='text-center'><img class='card-img-bottom py-2 w-25' src=" + post[0].contenu_media + " alt='media post'></p>";
        let cardFooter = "<div class='card-footer text-muted d-flex justify-content-between py-0'>" + commentairesHtml + likeDislikeHtml + "</div>";
        
        // Affichage de l'ensemble des Commentaires
        allComment(url + "/comment")
        .then(responseComment => {
            let ul = document.createElement("ul");
            ul.classList.add("container","px-0", "col-lg-6", "list-group", "all_comment");
            document.getElementById("one_post").append(ul);
            responseComment.forEach(comment => {
                document.getElementById(post[0].id).textContent = responseComment.length;
                let li = document.createElement("li");
                li.classList.add("list-group-item", "bg-light", "py-0");
                document.querySelector(".all_comment").prepend(li);
                let userCommentHtml = "<div class='card-header py-0'><h6>" + comment.prenom + " " + comment.nom + "</h6></div>";
                let commentPostHtml = "<div class='card-body py-0'><p>" + comment.comment_post + "</p></div>";
                li.innerHTML = "<div class='card'>" + userCommentHtml + commentPostHtml + "</div>";
            })
            let li = document.createElement("li");
            li.classList.add("list-group-item", "bg-light", "py-0");
            document.querySelector(".all_comment").prepend(li);
            let commentFormHtml = "<textarea class='form-control' id='comment' rows='1' placeholder='Nouveau commentaire...'></textarea>";
            let textInfo = "<small id='commentHelp' class='form-text text-muted'></small>"
            let submit = "<input type='submit' class='btn btn-primary mx-1' id='form_submit' value='Publier'>";
            li.innerHTML = "<form id='form' name='form' class='list-group-item bg-light py-1 px-0'><div class='form-group d-flex'>" + commentFormHtml + textInfo + submit + "</div></form>";
            
            // Creation d'un nouveau commentaire
            const form = document.getElementById("form");
            form.addEventListener("submit", (event) => {
            event.preventDefault();
            const comment = {
                comment_post: document.getElementById("comment").value,
            };
            newComment(url + "/comment", comment)
                .then(response => {
                    if (response.status === 201) {
                        document.location.reload();
                        console.log("Commentaire ajouté");
                    }
                    else {
                        let errorInfo = document.getElementById("commentHelp");
                        errorInfo.textContent = response.error;
                    }
                })
                .catch((error) => {
                    console.error(error, "Problème de communication avec l'API");
                })
            })

            // Affichage de l'ensemble des likes/dislikes
            allLikeDislike(url + "/like")
                .then(responseLikeDislike => {
                    let nbLike = document.getElementById("nb_like");
                    nbLike.textContent = responseLikeDislike[0].likes;
                    let nbDislike = document.getElementById("nb_dislike");
                    nbDislike.innerHTML = responseLikeDislike[0].dislikes;
                })
                .catch((error) => {
                    console.error(error, "Problème de communication avec l'API");
                });
        })

        if (post[0].contenu_text !== null && post[0].contenu_media !== null) {
            li.innerHTML = "<div class='card'>" + cardHeader + cardBodyText + cardImg + cardFooter + "</div>";
        }
        else if (post[0].contenu_media !== null) {
            li.innerHTML = "<div class='card'>" + cardHeader + cardBody + cardImg + cardFooter + "</div>";
        }
        else {
            li.innerHTML = "<div class='card'>" + cardHeader + cardBodyText + cardFooter + "</div>";
        }

        const like = document.getElementById("like");
            like.addEventListener("click", () => {
                const likeValue = {
                    like: 1
                }
                addLikeDislike(url + "/like", likeValue)
                    .then(responseLike => {
                        let nbLike = document.getElementById("nb_like");
                        nbLike.textContent = responseLike[0].likes;
                        let nbDislike = document.getElementById("nb_dislike");
                        nbDislike.innerHTML = responseLike[0].dislikes;
                    })
                    .catch((error) => {
                        console.error(error, "Problème de communication avec l'API");
                    });
            });
            // Ajout d'un dislike
            const dislike = document.getElementById("dislike");
            dislike.addEventListener("click", () => {
                const likeValue = {
                    like: -1
                }
                addLikeDislike(url + "/like", likeValue)
                    .then(responseDislike => {
                        let nbLike = document.getElementById("nb_like");
                        nbLike.textContent = responseDislike[0].likes;
                        let nbDislike = document.getElementById("nb_dislike");
                        nbDislike.innerHTML = responseDislike[0].dislikes;
                    })
                    .catch((error) => {
                        console.error(error, "Problème de communication avec l'API");
                    });
            });

    })
    .catch((error) => {
        console.error(error, "Problème de communication avec l'API");
    });