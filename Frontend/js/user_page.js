const form = document.getElementById("form");

// DEBUT SECTION ajout d'un POST
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let image = document.getElementById("contenu_media").files;
    const titre = document.getElementById("titre");
    const contenu = document.getElementById("contenu");
    const contenuText = document.getElementById("contenu_text");
    const titreError = document.getElementById("titreHelp");
    const contenuError = document.getElementById("contenuHelp");
    let post = {
        titre: titre.value,
        contenu_text: contenuText.value
    };

    // Ajout d'un Post avec image
    if (image[0] !== undefined) {
        const data = new FormData();
        data.append("image", image[0]);
        data.append("post", JSON.stringify(post));
        if ((inputRegex.test(titre.value) === true) && ((((contenuText.value !== "") && (inputRegex.test(contenuText.value) === true)) && (image[0] !== undefined)) || ((contenuText.value === "") && (image[0] !== undefined)))) {
        newPostWithMedia("http://localhost:3000/api/post/", data)
            .then(() => {
                    document.location.reload();
                    form.reset()
            })
            .catch((error) => {console.error(error, "Problème de communication avec l'API")});
        }
        else {
            errorInfosMedia(titre, contenuText, contenu, image[0], titreError, contenuError, "Un titre doit être indiqué et il ne doit pas commencer par un caractère spécial", "Un contenu doit être entré (texte ou media) et il ne doit pas commencer par un caractère spécial");
        }
    }
    // Ajout d'un Post sans image
    else {
        if ((inputRegex.test(titre.value) === true) && (inputRegex.test(contenuText.value) === true)) {
        newPostWithoutMedia("http://localhost:3000/api/post/", post)
            .then(() => {
                    document.location.reload();
                    form.reset()
            })
            .catch((error) => {console.error(error, "Problème de communication avec l'API")});
        }
        else {
            errorInfos(titre, contenuText, titreError, contenuError, "Un titre doit être indiqué et il ne doit pas commencer par un caractère spécial", "Un contenu doit être entré (texte ou media) et il ne doit pas commencer par un caractère spécial");
        } 
    }
});
// FIN SECTION ajout d'un POST

// DEBUT SECTION Affichage de l'ensemble des Posts //
allPost("http://localhost:3000/api/post/")
    .then(response => {
        response.sort((a, b) => a.id - b.id);
        let ul = document.createElement("ul");
        ul.classList.add("container","px-0", "col-lg-6", "list-group", "all_posts");
        document.getElementById("all_posts").append(ul);
        response.forEach(post => {
            let li = document.createElement("li");
            li.classList.add("list-group-item", "bg-light", "post");
            document.querySelector(".all_posts").prepend(li);
            let cardLink = "<a class=stretched-link' href='one_post.html?id=" + post.id + "' style='text-decoration:none'>";
            let userHtml = "<div class='d-flex align-items-center'><img src=" + post.avatar + " alt='Avatar de profil' class='w-25'><h6>"+ post.prenom + " " + post.nom + "</h6></div>";
            let datePostHtml = "<p class='font-italic'>" + dateCalcul(post.date_post) + "</p>";
            let titreHtml = "<h5 class='card-title font-weight-bold text-dark text'>" + post.titre + "</h5>";
            let contenu_textHtml = "<p class='card-text text-dark'>" + post.contenu_text + "</p>";
            let commentairesHtml = "<div id='comment_button_" + post.id + "'><p class='btn btn-primary'>Commentaires <span class='badge bg-secondary' id='" + post.id + "'></span></p></div>";
            let likeHtml = "<p><a class='fas fa-thumbs-up fa-2x pr-2' id='like_" + post.id + "'></a><span id='nb_like_" + post.id + "' class='pr-1'></span></p>";
            let dislikeHtml = "<p class='pt-2'><a class='fas fa-thumbs-down fa-2x align-middle' style='text-decoration:none' id='dislike_" + post.id + "'></a> <span id='nb_dislike_" + post.id + "' class='pr-1'></span></p>";
            let likeDislikeHtml = "<div class='d-flex m-1'>" + likeHtml + dislikeHtml + "</div>";
            let cardHeader = "<div class='card-header d-flex justify-content-between align-items-center py-0 px-1'>" + userHtml + datePostHtml + "</div>";
            let cardBody = "<div class='card-body px-0 py-0'>" + titreHtml + "</div>";
            let cardBodyText = "<div class='card-body px-0 py-0'>" + titreHtml + contenu_textHtml + "</div>";
            let cardImg = "<p class='text-center'><img class='card-img-bottom py-2 w-25' src=" + post.contenu_media + " alt='media post'></p>";
            let cardFooter = "<div class='card-footer text-muted d-flex justify-content-between py-0'>" + commentairesHtml + likeDislikeHtml + "</div>";

            // DEBUT SECTION Commentaires //
            // Affichage du nombre de commentaires pour chaque Post
            allComment("http://localhost:3000/api/post/" + post.id + "/comment")
                .then(responseComment => {
                    responseComment.forEach(comment => {
                        if (comment.post_id === post.id) {
                            document.getElementById(post.id).textContent = responseComment.length;
                        }
                    })
                })
                .catch((error) => {console.error(error, "Problème de communication avec l'API")});

            if (post.contenu_text !== null && post.contenu_media !== null) {
                li.innerHTML = "<div class='card' id='post_" + post.id + "'>" + cardLink + cardHeader + cardBodyText + cardImg + "</a>" + cardFooter + "</div>";
            }
            else if (post.contenu_media !== null) {
                li.innerHTML = "<div class='card' id='post_" + post.id + "'>" + cardLink + cardHeader + cardBody + cardImg + "</a>" + cardFooter + "</div>";
            }
            else {
                li.innerHTML = "<div class='card' id='post_" + post.id + "'>" + cardLink + cardHeader + cardBodyText + "</a>" + cardFooter + "</div>";
            }
            
            // Affichage des commentaires pour chaque Post au click sur le bouton Commentaires
            const commentButton = document.getElementById("comment_button_" + post.id);
            let i = true;
            commentButton.addEventListener("click", () => {
                if (i === false) {
                    document.getElementById("comment_" + post.id).remove();
                    i = true;
                }
                else {
                    allComment("http://localhost:3000/api/post/" + post.id + "/comment")
                        .then(responseComment => {
                            let ul = document.createElement("ul");
                            ul.classList.add("container","px-0", "list-group", "all_comment");
                            ul.id = "comment_" + post.id;
                            document.getElementById("post_" + post.id).append(ul);
                            responseComment.forEach(comment => {
                                    let li = document.createElement("li");
                                    li.classList.add("list-group-item", "bg-light", "py-0");
                                    document.querySelector(".all_comment").prepend(li);
                                    let userCommentHtml = "<h6>" + comment.prenom + " " + comment.nom + "</h6>";
                                    let dateCommentHtml = "<p class='font-italic mb-1'>" + dateCalcul(comment.date_comment) + "</p>";
                                    let commentPostHtml = "<div class='card-body py-0'><p>" + comment.comment_post + "</p></div>";
                                    let cardHeaderComment = "<div class='card-header py-0 d-flex justify-content-between'>" + userCommentHtml + dateCommentHtml + "</div>";
                                    li.innerHTML = "<div class='card'>" + cardHeaderComment + commentPostHtml + "</div>";
                            })
                            // DEBUT SECTION nouveau commentaire //
                            let li = document.createElement("li");
                            li.classList.add("list-group-item", "bg-light", "py-0");
                            document.getElementById("comment_" + post.id).prepend(li);
                            let commentFormHtml = "<textarea class='form-control' id='comment' rows='1' placeholder='Nouveau commentaire...'></textarea>";
                            let textInfo = "<small id='commentHelp' class='form-text'></small>"
                            let submit = "<input type='submit' class='btn btn-primary mx-1' id='form_submit' value='Publier'>";
                            li.innerHTML = "<form id='form_" + post.id + "' name='form' class='list-group-item bg-light py-1 px-0'><div class='form-group d-flex'>" + commentFormHtml + textInfo + submit + "</div></form>";
                            // Creation d'un nouveau commentaire
                            const formComment = document.getElementById("form_" + post.id);
                            const commentPost = document.getElementById("comment");
                            const commentError = document.getElementById("commentHelp");
                            formComment.addEventListener("submit", (event) => {
                            event.preventDefault();
                            const comment = {
                                comment_post: commentPost.value,
                            };
                            if (inputRegex.test(commentPost.value) === true) {
                                newComment("http://localhost:3000/api/post/" + post.id + "/comment", comment)
                                    .then(() => {
                                            document.location.reload();
                                    })
                                    .catch((error) => {console.error(error, "Problème de communication avec l'API")});
                            }
                            else {
                                errorInput(commentPost, commentError, "Un contenu doit être entré et il ne doit pas commencer par un caractère spécial");
                            }
                            })
                            // FIN SECTION nouveau commentaire //
                            i = false;
                        })
                        .catch((error) => {console.error(error, "Problème de communication avec l'API")});
                } 
            });
            // FIN SECTION Commentaires //

            // DEBUT SECTION Like/Dislike //
            // Affichage de l'ensemble des likes/dislikes
            allLikeDislike("http://localhost:3000/api/post/" + post.id + "/like")
                .then(responseLikeDislike => {
                    let nbLike = document.getElementById("nb_like_" + post.id);
                    nbLike.textContent = responseLikeDislike[0].likes;
                    let nbDislike = document.getElementById("nb_dislike_" + post.id);
                    nbDislike.innerHTML = responseLikeDislike[0].dislikes;
                })
                .catch((error) => {console.error(error, "Problème de communication avec l'API")});

            // Ajout d'un like
            const like = document.getElementById("like_" + post.id);
            like.addEventListener("click", () => {
                const likeValue = {
                    like: 1
                }
                addLikeDislike("http://localhost:3000/api/post/" + post.id + "/like", likeValue)
                    .then(responseLike => {
                        let nbLike = document.getElementById("nb_like_" + post.id);
                        nbLike.textContent = responseLike[0].likes;
                        let nbDislike = document.getElementById("nb_dislike_" + post.id);
                        nbDislike.innerHTML = responseLike[0].dislikes;
                    })
                    .catch((error) => {console.error(error, "Problème de communication avec l'API")});
            });
            // Ajout d'un dislike
            const dislike = document.getElementById("dislike_" + post.id);
            dislike.addEventListener("click", () => {
                const likeValue = {
                    like: -1
                }
                addLikeDislike("http://localhost:3000/api/post/" + post.id + "/like", likeValue)
                    .then(responseDislike => {
                        let nbLike = document.getElementById("nb_like_" + post.id);
                        nbLike.textContent = responseDislike[0].likes;
                        let nbDislike = document.getElementById("nb_dislike_" + post.id);
                        nbDislike.innerHTML = responseDislike[0].dislikes;
                    })
                    .catch((error) => {console.error(error, "Problème de communication avec l'API")});
            });
            // FIN SECTION Like/Dislike //
        });

        // DEBUT SECTION RECHERCHE //
        const searchBar = document.getElementById("search");
        // Rechercher un Post (Créateur, titre ou contenu)
        searchBar.addEventListener('keyup', () => {
            let searchValue = searchBar.value.toLowerCase();
            let postSearch = document.querySelectorAll('.post');
            Array.prototype.forEach.call(postSearch, (document) => {
                if (document.textContent.toLowerCase().indexOf(searchValue) > -1) {
                document.style.display = 'block';
                }
                else {
                document.style.display = 'none';
                }
            });
        });
        // FIN SECTION RECHERCHE //
    })
    .catch((error) => {console.error(error, "Problème de communication avec l'API")});
// FIN SECTION Affichage de l'ensemble des Posts //

// Déconnexion
logout();