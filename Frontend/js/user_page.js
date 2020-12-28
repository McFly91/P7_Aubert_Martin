const form = document.getElementById("form");

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
        console.log(error);
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
        console.log(error);
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

const likeDislike = async (url, data) => {
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
        console.log(error);
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
        console.log(error);
    };
};

// Ajout d'un nouveau Post
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const image = document.getElementById("contenu_media").files;
    const post = {
        titre: document.getElementById("titre").value,
        contenu_text: document.getElementById("contenu_text").value
    };
    if (image[0] !== undefined) {
        const data = new FormData();
        data.append("image", image[0]);
        data.append("post", JSON.stringify(post));
        newPostWithMedia("http://localhost:3000/api/post/", data)
        .then(response => {
            if (response.status === 201) {
                document.location.reload();
                console.log("Post créé");
            }
            else {
                let errorInfo = document.getElementById("contenuHelp");
                errorInfo.textContent = response.error;
            } 
        })
        .catch((error) => {
            console.log(error, "Problème de communication avec l'API");
        });
    }
    else {
    newPostWithoutMedia("http://localhost:3000/api/post/", post)
        .then(response => {
            if (response.status === 201) {
                document.location.reload();
                console.log("Post créé");
            }
            else {
                let errorInfo = document.getElementById("contenuHelp");
                errorInfo.textContent = response.error;
            } 
        })
        .catch((error) => {
            console.log(error, "Problème de communication avec l'API");
        }); 
    }
});

// Affichage de l'ensemble des Posts
allPost("http://localhost:3000/api/post/")
    .then(response => {
        let ul = document.createElement("ul");
        ul.classList.add("container","px-0", "col-lg-6", "list-group", "all_posts");
        document.getElementById("all_posts").append(ul);
        console.log("REPONSE POST :" + response)
        response.forEach(post => {
            console.log(post);
            let li = document.createElement("li");
            li.classList.add("list-group-item", "bg-light");
            document.querySelector(".all_posts").prepend(li);
            let userHtml = "<h6>" + post.prenom + " " + post.nom + "</h6>";
            let datePostHtml = "<p class='font-italic'>" + dateCalcul(post.date_post) + "</p>";
            let titreHtml = "<h5 class='card-title font-weight-bold'>" + post.titre + "</h5>";
            let contenu_textHtml = "<p class='card-text'>" + post.contenu_text + "</p>";
            let cardLink = "<a class=stretched-link' href='one_post.html?id=" + post.id + "' style='text-decoration:none'>";
            let idCommentaireHtml = post.id;
            let commentairesHtml = cardLink + "<p class='btn btn-primary'>Commentaires <span class='badge bg-secondary' id='" + idCommentaireHtml + "'></p></a>";
            let likeHtml = "<p><a class='fas fa-thumbs-up fa-2x pr-2' id='like'></a><span id='nb_like" + post.id + "' class='pr-1'></span></p>";
            let dislikeHtml = "<p class='pt-2'><a class='fas fa-thumbs-down fa-2x align-middle' style='text-decoration:none' id='dislike'></a> <span id='nb_dislike" + post.id + "' class='pr-1'></span></p>";
            let likeDislikeHtml = "<div class='d-flex m-1'>" + likeHtml + dislikeHtml + "</div>";
            let cardHeader = "<div class='card-header d-flex justify-content-between'>" + userHtml + datePostHtml + "</div>";
            let cardBody = "<div class='card-body px-0 py-0'>" + titreHtml + "</div>";
            let cardBodyText = "<div class='card-body px-0 py-0'>" + titreHtml + contenu_textHtml + "</div>";
            let cardImg = "<p class='text-center'><img class='card-img-bottom py-2 w-25' src=" + post.contenu_media + " alt='media post'></p>";
            let cardFooter = "<div class='card-footer text-muted d-flex justify-content-between py-0'>" + commentairesHtml + likeDislikeHtml + "</div>";

            // Affichage de l'ensemble des commentaires pour chaque Post
            allComment("http://localhost:3000/api/post/" + post.id + "/comment")
                .then(responseComment => {
                    responseComment.forEach(comment => {
                        console.log(comment, post.id)
                        if (comment.post_id === post.id) {
                            document.getElementById(post.id).textContent = responseComment.length;
                        }
                    })
                })
                .catch((error) => {
                    console.log(error, "Problème de communication avec l'API");
                })
            
            
            // Affichage de l'ensemble des likes/dislikes
            allLikeDislike("http://localhost:3000/api/post/" + post.id + "/like")
                .then(responseLikeDislike => {
                    let nbLike = document.getElementById("nb_like" + post.id);
                    nbLike.textContent = responseLikeDislike[0].likes;
                    let nbDislike = document.getElementById("nb_dislike" + post.id);
                    nbDislike.innerHTML = responseLikeDislike[0].dislikes;
                })
                .catch((error) => {
                    console.log(error, "Problème de communication avec l'API");
                });

            if (post.contenu_text !== null && post.contenu_media !== null) {
                li.innerHTML = "<div class='card'>" + cardHeader + cardBodyText + cardImg + cardFooter + "</div>";
            }
            else if (post.contenu_media !== null) {
                li.innerHTML = "<div class='card'>" + cardHeader + cardBody + cardImg + cardFooter + "</div>";
            }
            else {
                li.innerHTML = "<div class='card'>"+ cardHeader + cardBodyText + cardFooter + "</div>";
            }

            // Ajout d'un like
            const like = document.getElementById("like");
            like.addEventListener("click", () => {
                const likeValue = {
                    like: 1
                }
                likeDislike("http://localhost:3000/api/post/" + post.id + "/like", likeValue)
                    .then(responseLike => {
                        let nbLike = document.getElementById("nb_like" + post.id);
                        nbLike.textContent = responseLike[0].likes;
                        let nbDislike = document.getElementById("nb_dislike" + post.id);
                        nbDislike.innerHTML = responseLike[0].dislikes;
                    })
                    .catch((error) => {
                        console.log(error, "Problème de communication avec l'API");
                    });
            });
            const dislike = document.getElementById("dislike");
            dislike.addEventListener("click", () => {
                const likeValue = {
                    like: -1
                }
                likeDislike("http://localhost:3000/api/post/" + post.id + "/like", likeValue)
                    .then(responseDislike => {
                        let nbLike = document.getElementById("nb_like" + post.id);
                        nbLike.textContent = responseDislike[0].likes;
                        let nbDislike = document.getElementById("nb_dislike" + post.id);
                        nbDislike.innerHTML = responseDislike[0].dislikes;
                    })
                    .catch((error) => {
                        console.log(error, "Problème de communication avec l'API");
                    });
            });
        });
    })
    .catch((error) => {
        console.log(error, "Problème de communication avec l'API");
    });