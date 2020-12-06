const connectionDB = require("../connexion_mysql");

exports.postSchema = (titre, contenu_text, contenu_media, user_post) => {

    if ((contenu_text && contenu_media) !== null) {
        connectionDB.query("INSERT INTO Post (titre, contenu_text, contenu_media, user_post) VALUES (?, ?, ?, ?);", [titre, contenu_text, contenu_media, user_post], (error, results) => {
            if (error) throw error;
            results;
            console.log("boucle 1")
        });
    }
    else if (contenu_media !== null) {
        connectionDB.query("INSERT INTO Post (titre, contenu_media, user_post) VALUES (?, ?, ?);", [titre, contenu_media, user_post], (error, results) => {
            if (error) throw error;
            results;
            console.log("boucle 2")
        });
    }
    else {
        connectionDB.query("INSERT INTO Post (titre, contenu_text, user_post) VALUES (?, ?, ?);", [titre, contenu_text, user_post], (error, results) => {
            if (error) throw error;
            results;
            console.log("boucle 3")  
        });
    } 

    /*try {
        return new Promise((resolve) => {
            if ((contenu_text && contenu_media) !== null) {
                connectionDB.query("INSERT INTO Post (titre, contenu_text, contenu_media, user_post) VALUES (?, ?, ?, ?);", [titre, contenu_text, contenu_media, user_post], (error, results) => {
                    if (results === undefined) {
                        resolve (error = "Erreur dans la requête");
                    }
                    else {
                        resolve (results);
                    }
                });
            }
            else if (contenu_media !== null) {
                connectionDB.query("INSERT INTO Post (titre, contenu_media, user_post) VALUES (?, ?, ?);", [titre, contenu_media, user_post], (error, results) => {
                    if (results === undefined) {
                        resolve (error = "Erreur dans la requête");
                    }
                    else {
                        resolve (results);
                    }
                });
            }
            else {
                connectionDB.query("INSERT INTO Post (titre, contenu_text, user_post) VALUES (?, ?, ?);", [titre, contenu_text, user_post], (error, results) => {
                    if (results === undefined) {
                        resolve (error = "Erreur dans la requête");
                    }
                    else {
                        resolve (results);
                    }
                });
            } 
        });
    }
    catch (error) {
        console.log(error);
    };*/
}

exports.onePost = (id) => {
    try {
        return new Promise((resolve) => {
            connectionDB.query("SELECT * FROM Post WHERE id = ?;", [id], (error, results) => {
                if (results === undefined) {
                    resolve (error = "Erreur dans la requête");
                }
                else {
                    resolve (results);
                }
            });
        });
    }
    catch (error) {
        console.log(error);
    };
};

exports.allPost = () => {
    try {
        return new Promise((resolve) => {
            connectionDB.query("SELECT * FROM Post;", (error, results) => {
                if (results === undefined) {
                    resolve (error = "Erreur dans la requête");
                }
                else {
                    resolve (results);
                }
            });
        });
    }
    catch (error) {
        console.log(error);
    };
};