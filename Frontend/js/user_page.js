const newPost = (titre, contenu_text, contenu_media) => {
    try {
        return new Promise ((resolve,reject) => {
            let request = new XMLHttpRequest();
            request.open("POST", "http://localhost:3000/api/post/");
            request.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status === 201) {
                    request.onload = () => resolve(this.statusText);
                }
                else {
                    request.onerror = () => reject(this.statusText);
                }
            };
            request.setRequestHeader("Authorization", `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify({titre, contenu_text, contenu_media}));
        });
    }
    catch (error) {
        console.log(error);
    };
};

const allPost = () => {
    try {
        return new Promise ((resolve,reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", "http://localhost:3000/api/post/");
            request.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status === 200) {
                    resolve (JSON.parse(this.responseText));
                    request.onload = () => this.statusText;
                }
                else {
                    request.onerror = () => reject(this.statusText);
                }
            };
            request.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
            request.send();
        });
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

const allComment = () => {
    try {
        return new Promise ((resolve,reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", "http://localhost:3000/api/post/:id/comment");
            request.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status === 200) {
                    resolve (JSON.parse(this.responseText));
                    request.onload = () => this.statusText;
                }
                else {
                    request.onerror = () => reject(this.statusText);
                }
            };
            request.send();
        });
    }
    catch (error) {
        console.log(error);
    };
};

// Ajout d'un nouveau Post
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let titre = document.getElementById("titre").value;
    let contenu_text = document.getElementById("contenu_text").value;
    let contenu_media = null;
    newPost(titre, contenu_text, contenu_media)
        .then(() => console.log("Post créé"))
        .catch((error) => {
            console.log(error, "Problème de communication avec l'API");
        }); 
});

// Affichage de l'ensemble des Posts
allPost()
    .then( response => {
        let ul = document.createElement("ul");
        ul.classList.add("container","px-0", "col-lg-6", "list-group", "all_posts");
        document.getElementById("all_posts").append(ul);
        response.forEach(post => {
            console.log(post);
            let li = document.createElement("li");
            li.classList.add("list-group-item", "bg-light");
            document.querySelector(".all_posts").prepend(li);
            if (post.contenu_text !== null && post.contenu_media !== null) {
                li.innerHTML = "<div class='card'><div class='card-header d-flex justify-content-between'><h6>" + post.user_id + 
                "</h6><p class='font-italic'>" + dateCalcul(post.date_post) +
                "</p></div><div class='card-body px-0 py-0'><h5 class='card-title font-weight-bold'>" + post.titre + 
                "</h5><p class='card-text'>" + post.contenu_text + 
                "</p></div><p class='text-center'><img class='card-img-bottom py-2 w-25' src=" + post.contenu_media + 
                " alt='media post'></p><div class='card-footer text-muted d-flex justify-content-between py-0'><p>Commentaires   Nb : </p><p><i class='fa-thumbs-up fa-2x'></i><i class='fa-thumbs-down fa-2x'></i></p></div><a class=stretched-link' href='user_page.html?id=" + post.id +
                "'></div>";
            }
            else if (post.contenu_media !== null) {
                li.innerHTML = "<div class='card'><div class='card-header d-flex justify-content-between'><h6>" + post.user_id + 
                "</h6><p class='font-italic'>" + dateCalcul(post.date_post) +
                "</p></div><div class='card-body px-0 py-0'><h5 class='card-title font-weight-bold'>" + post.titre + 
                "</h5><p class='text-center'><img class='card-img-bottom py-2 w-25' src=" + post.contenu_media + 
                " alt='media post'></p><div class='card-footer text-muted d-flex justify-content-between py-0'><p>Commentaires   Nb : </p><p><i class='fa-thumbs-up fa-2x'></i><i class='fa-thumbs- fa-2x'></i></p></div><a class=stretched-link' href='user_page.html?id=" + post.id +
                "'></div>";
            }
            else {
                li.innerHTML = "<div class='card'><div class='card-header d-flex justify-content-between'><h6>" + post.user_id + 
                "</h6><p class='font-italic'>" + dateCalcul(post.date_post) +
                "</p></div><div class='card-body px-0 py-0'><h5 class='card-title font-weight-bold'>" + post.titre + 
                "</h5><p class='card-text'>" + post.contenu_text + 
                "</p><div class='card-footer text-muted d-flex justify-content-between py-0'><p>Commentaires   Nb : </p><p><i class='fa-thumbs-up fa-2x'></i><i class='fa-thumbs- fa-2x'></i></p></div><a class=stretched-link' href='user_page.html?id=" + post.id +
                "'></div>";
            }
        });
    })
    .catch((error) => {
        console.log(error, "Problème de communication avec l'API");
    });
