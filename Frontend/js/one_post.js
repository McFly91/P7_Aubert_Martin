const idUrl = new URLSearchParams(document.location.search);
const url = "http://localhost:3000/api/post/" + idUrl.get("id");
const userId = sessionStorage.getItem("userId");
const role = sessionStorage.getItem("role");

// DEBUT SECTION Affichage d'un Post //
onePost(url)
    .then(post => {
        console.log(post);
        let ul = document.createElement("ul");
        ul.classList.add("container","px-0", "col-lg-6", "list-group", "one_post");
        document.getElementById("one_post").append(ul);
        let li = document.createElement("li");
        li.classList.add("list-group-item", "bg-light", "pb-0", "mt-4");
        document.querySelector(".one_post").prepend(li);
        let userHtml = "<div class='d-flex align-items-center'><img src=" + post[0].avatar + " alt='Avatar de profil' class='w-25'><h6>"+ post[0].prenom + " " + post[0].nom + "</h6></div>";
        let datePostHtml = "<p class='font-italic'>" + dateCalcul(post[0].date_post) + "</p>";
        let titreHtml = "<h5 class='card-title font-weight-bold'>" + post[0].titre + "</h5>";
        let contenu_textHtml = "<p class='card-text'>" + post[0].contenu_text + "</p>";
        let commentairesHtml = "<p class='btn btn-primary mb-4'>Commentaires <span class='badge bg-secondary' id='" + post[0].id + "'></p>";
        let likeHtml = "<p><a class='fas fa-thumbs-up fa-2x pr-2' id='like'></a><span id='nb_like' class='pr-1'></span></p>";
        let dislikeHtml = "<p class='pt-2'><a class='fas fa-thumbs-down fa-2x align-middle' style='text-decoration:none' id='dislike'></a> <span id='nb_dislike' class='pr-1'></span></p>";
        let likeDislikeHtml = "<div class='d-flex m-1'>" + likeHtml + dislikeHtml + "</div>";
        let modifyPostHtml = "<button class='fas fa-pencil-alt btn btn-secondary' id='modify_post'></button>";
        let deletePostHtml = "<button class='fas fa-times btn btn-danger' id='delete_post'></button>"; 
        let modifyDeletePostHtml = "";

        // Condition de suppression et de modification pour l'auteur du Post
        if (post[0].user_id == userId) {
            modifyDeletePostHtml = "<div class='d-flex justify-content-end'>" + modifyPostHtml + deletePostHtml + "</div>";
        }
        // Condition de suppression d'un Post pour l'Admin
        else if (role === "admin") {
            modifyDeletePostHtml = "<div class='d-flex justify-content-end'>" + deletePostHtml + "</div>";
        }
        else {
            modifyDeletePostHtml;
        }

        // Affichage de l'ensemble des éléments sur la page HTML
        let cardHeader = "<div class='card-header d-flex justify-content-between align-items-center py-0 px-1'>" + userHtml + datePostHtml + "</div>";
        let cardBody = "<div class='card-body px-0 py-0'>" + titreHtml + "</div>";
        let cardBodyText = "<div class='card-body px-0 py-0'>" + titreHtml + contenu_textHtml + "</div>";
        let cardImg = "<p class='text-center'><img class='card-img-bottom py-2 w-25' src=" + post[0].contenu_media + " alt='media post'></p>";
        let cardFooter = "<div class='card-footer text-muted d-flex justify-content-between py-0'>" + commentairesHtml + likeDislikeHtml + "</div>";
        if (post[0].contenu_text !== null && post[0].contenu_media !== null) {
            li.innerHTML = modifyDeletePostHtml + "<div class='card'>" + cardHeader + cardBodyText + cardImg + cardFooter + "</div>";
        }
        else if (post[0].contenu_media !== null) {
            li.innerHTML = modifyDeletePostHtml + "<div class='card'>" + cardHeader + cardBody + cardImg + cardFooter + "</div>";
        }
        else {
            li.innerHTML = modifyDeletePostHtml + "<div class='card'>" + cardHeader + cardBodyText + cardFooter + "</div>";
        }

        // DEBUT SECTION Modification et Suppression d'un POST //
        if (post[0].user_id == userId) {
            // Modification d'un Post
            const modifyPost = document.getElementById("modify_post");
            modifyPost.addEventListener("click", () => {
                titreHtml = "<div class='form-group'><label for='Titre'>Titre</label><input type='text' class='form-control' id='modify_titre' value='" + post[0].titre + "'><small id='modify_titreHelp' class='form-text'></small></div>";
                contenu_textHtml = "<div class='form-group' id='contenu'><label for='contenu'>Contenu</label><textarea class='form-control' id='modify_contenu_text' rows='3'>" + post[0].contenu_text + "</textarea>";
                cardImg = "<p class='text-center'><img class='card-img-bottom py-2 w-25' src=" + post[0].contenu_media + " alt='media post'></p>";
                modifyImg = "<input type='file' id='modify_contenu_media' class='btn'><small id='modify_contenuHelp' class='form-text'></small></div>";
                cardBodyText = "<div class='card-body px-0 py-0'><form id='modify_form_post' name='form' class='list-group-item'>" + titreHtml + contenu_textHtml;
                let modifySubmit = "<div class='col d-flex justify-content-around'><input type='submit' class='btn btn-primary' value='Publier'></div></form>";

                if (post[0].contenu_text !== null && post[0].contenu_media !== null) {
                    li.innerHTML = modifyDeletePostHtml + "<div class='card'>" + cardHeader + cardBodyText + cardImg + modifyImg + modifySubmit + cardFooter + "</div>";
                }
                else if (post[0].contenu_media !== null) {
                    li.innerHTML = modifyDeletePostHtml + "<div class='card'>" + cardHeader + cardBodyText + cardImg + modifyImg + modifySubmit + cardFooter + "</div>";
                }
                else {
                        li.innerHTML = modifyDeletePostHtml + "<div class='card'>" + cardHeader + cardBodyText + modifyImg + modifySubmit + cardFooter + "</div>";
                }
                
                const modifyFormPost = document.getElementById("modify_form_post");
                modifyFormPost.addEventListener("submit", (event) => {
                    event.preventDefault();
                    const image = document.getElementById("modify_contenu_media").files;
                    const titre = document.getElementById("modify_titre");
                    const contenu = document.getElementById("contenu");
                    const contenuText = document.getElementById("modify_contenu_text");
                    const titreError = document.getElementById("modify_titreHelp");
                    const contenuError = document.getElementById("modify_contenuHelp");
                    const postModified = {
                        titre: document.getElementById("modify_titre").value,
                        contenu_text: document.getElementById("modify_contenu_text").value
                    }
                    console.log(image[0], postModified)
                    // Modification d'un Post avec image
                    if (image[0] !== undefined) {
                        const data = new FormData();
                        data.append("image", image[0]);
                        data.append("post", JSON.stringify(postModified));
                        if ((inputRegex.test(titre.value) === true) && ((((contenuText.value !== "") && (inputRegex.test(contenuText.value) === true)) && (image[0] !== undefined)) || ((contenuText.value === "") && (image[0] !== undefined)))) {
                            modifyPostWithMedia(url, data)
                                .then(() => {
                                        document.location.reload();
                                })
                                .catch((error) => {console.error(error, "Problème de communication avec l'API")});
                        }
                        else {
                            errorInfosMedia(titre, contenuText, contenu, image[0], titreError, contenuError, "Un titre doit être indiqué et il ne doit pas commencer par un caractère spécial", "Un contenu doit être entré (texte ou media) et il ne doit pas commencer par un caractère spécial");
                        }
                    }
                    // Modification d'un Post sans image
                    else {
                        if ((inputRegex.test(titre.value) === true) && (inputRegex.test(contenuText.value) === true)) {
                        modifyPostWithoutMedia(url, postModified)
                            .then(() => {
                                document.location.reload();
                            })
                            .catch((error) => {console.error(error, "Problème de communication avec l'API")});
                        }
                        else {
                            errorInfos(titre, contenuText, titreError, contenuError, "Un titre doit être indiqué et il ne doit pas commencer par un caractère spécial", "Un contenu doit être entré (texte ou media) et il ne doit pas commencer par un caractère spécial");
                        } 
                    }
                })
            })
        }

            // Suppression d'un Post
            const deletePost = document.getElementById("delete_post");
            deletePost.addEventListener("click", () => {
                deleteOnePost(url)
                    .then((responseDeletePost => {
                        document.location.href="user_page.html";
                        console.log(responseDeletePost);
                    }))  
                    .catch((error) => {console.error(error, "Problème de communication avec l'API")});
            })
        // FIN SECTION Modification d'un POST //

        // DEBUT SECTION Commentaires //
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
                    let userCommentHtml = "<h6>" + comment.prenom + " " + comment.nom + "</h6>";
                    let dateCommentHtml = "<p class='font-italic mb-1'>" + dateCalcul(comment.date_comment) + "</p>";
                    let commentPostHtml = "<div class='card-body py-0'><p>" + comment.comment_post + "</p></div>";
                    let cardHeaderComment = "<div class='card-header py-0 d-flex justify-content-between'>" + userCommentHtml + dateCommentHtml + "</div>";
                    let modifyCommentHtml = "<button class='fas fa-pencil-alt btn btn-secondary' id='modify_comment_" + comment.id + "'></button>";
                    let deleteCommentHtml = "<button class='fas fa-times btn btn-danger' id='delete_comment_" + comment.id + "'></button>";
                    let modifyDeleteCommentHtml = "";
                    
                    // Condition de modification et de suppression pour l'auteur du commentaire
                    if (comment.user_id == userId) {
                        modifyDeleteCommentHtml = "<div class='d-flex justify-content-end'>" + modifyCommentHtml + deleteCommentHtml + "</div>";
                    }
                    // Condition de suppression d'un Commentaire pour l'Admin
                    else if (role === "admin") {
                        modifyDeleteCommentHtml = "<div class='d-flex justify-content-end'>" + deleteCommentHtml + "</div>";
                    }
                    else {
                        modifyDeleteCommentHtml;
                    }
                    // Affichage de l'ensemble des éléments sur la page HTML
                    li.innerHTML = modifyDeleteCommentHtml + "<div class='card'>" + cardHeaderComment + commentPostHtml + "</div>";

                    // DEBUT SECTION Modification et Suppression d'un Commentaire //
                    if (comment.user_id == userId) {
                        // Modification d'un Commentaire
                        const modifyCommentButton = document.getElementById("modify_comment_" + comment.id);
                        modifyCommentButton.addEventListener("click", () => {
                            commentPostHtml = "<div class='form-group d-flex'><textarea class='form-control' id='modify_contenu_comment_" + comment.id + "' rows='1'>" + comment.comment_post + "</textarea>";
                            let textInfo = "<small id='modify_commentHelp_" + comment.id + "' class='form-text text-muted'></small>";
                            let cardModifyComment = "<div class='card-body px-0 py-0'><form id='modify_form_comment_" + comment.id + "' name='form' class='list-group-item bg-light'>" + commentPostHtml;
                            let modifySubmit = "<div class='mx-1'><input type='submit' class='btn btn-primary' value='Publier'></div></form>";

                            li.innerHTML = modifyDeleteCommentHtml + "<div class='card'>" + cardHeaderComment + cardModifyComment + textInfo + modifySubmit + "</div>";

                            const modifyFormComment = document.getElementById("modify_form_comment_" + comment.id);
                            modifyFormComment.addEventListener("submit", (event) => {
                                event.preventDefault();
                                const commentModified = {
                                    comment_post: document.getElementById("modify_contenu_comment_" + comment.id).value,
                                };
                                modifyComment(url + "/comment/" + comment.id, commentModified)
                                    .then(responseModifyComment => {
                                        if (responseModifyComment.status === 200) {
                                            document.location.reload();
                                            console.log("Commentaire modifié");
                                        }
                                        else {
                                            let errorInfo = document.getElementById("modify_commentHelp_" + comment.id);
                                            errorInfo.textContent = responseModifyComment.error;
                                        } 
                                    })
                                    .catch((error) => {console.error(error, "Problème de communication avec l'API")}); 
                            })
                        })
                    }

                    // Suppression d'un Commentaire
                    if ((comment.user_id == userId) || (role === "admin")) {
                        const deleteComment = document.getElementById("delete_comment_" + comment.id);
                        deleteComment.addEventListener("click", () => {
                        deleteOneComment(url + "/comment/" + comment.id)
                            .then((responseDeleteComment => {
                                document.location.reload();
                                console.log(responseDeleteComment);
                            }))  
                            .catch((error) => {console.error(error, "Problème de communication avec l'API")});
                        }) 
                    }
                    // FIN SECTION Modification et Suppression d'un Commentaire //  
                })

                // DEBUT SECTION nouveau commentaire //
                let li = document.createElement("li");
                li.classList.add("list-group-item", "bg-light", "py-0");
                document.querySelector(".all_comment").prepend(li);
                let commentFormHtml = "<textarea class='form-control' id='comment' rows='1' placeholder='Nouveau commentaire...'></textarea>";
                let textInfo = "<small id='commentHelp' class='form-text'></small>"
                let submit = "<input type='submit' class='btn btn-primary mx-1' id='form_submit' value='Publier'>";
                li.innerHTML = "<form id='form' name='form' class='list-group-item bg-light py-1 px-0'><div class='form-group d-flex'>" + commentFormHtml + textInfo + submit + "</div></form>";
                // Creation d'un nouveau commentaire
                const form = document.getElementById("form");
                form.addEventListener("submit", (event) => {
                    event.preventDefault();
                    const commentPost = document.getElementById("comment");
                    const commentError = document.getElementById("commentHelp");
                    const comment = {
                        comment_post: commentPost.value,
                    };
                    if (inputRegex.test(commentPost.value) === true) {
                    newComment(url + "/comment", comment)
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
            })
            .catch((error) => {console.error(error, "Problème de communication avec l'API")});
        // FIN SECTION Commentaires //

        // DEBUT SECTION Like/Dislike //
        // Affichage de l'ensemble des likes/dislikes
        allLikeDislike(url + "/like")
            .then(responseLikeDislike => {
                let nbLike = document.getElementById("nb_like");
                nbLike.textContent = responseLikeDislike[0].likes;
                let nbDislike = document.getElementById("nb_dislike");
                nbDislike.innerHTML = responseLikeDislike[0].dislikes;
            })
            .catch((error) => {console.error(error, "Problème de communication avec l'API")});

        // Ajout d'un like
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
                    .catch((error) => {console.error(error, "Problème de communication avec l'API")});
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
                .catch((error) => {console.error(error, "Problème de communication avec l'API")});
        });
        // FIN SECTION Like/Dislike //  
    })
    .catch((error) => {console.error(error, "Problème de communication avec l'API")});
// FIN SECTION Affichage d'un Post //

// Déconnexion
logout();