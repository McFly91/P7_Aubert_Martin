const connectionDB = require("../connexion_mysql");

exports.postSchema = (titre, contenu_text, contenu_media, user_id) => {
    if ((contenu_text && contenu_media) !== null) {
        connectionDB.query("INSERT INTO Post (titre, contenu_text, contenu_media, user_id) VALUES (?, ?, ?, ?);", [titre, contenu_text, contenu_media, user_id], (error, results) => {
            if (error) throw error;
            results;
        });
    }
    else if (contenu_media !== null) {
        connectionDB.query("INSERT INTO Post (titre, contenu_media, user_id) VALUES (?, ?, ?);", [titre, contenu_media, user_id], (error, results) => {
            if (error) throw error;
            results;
        });
    }
    else {
        connectionDB.query("INSERT INTO Post (titre, contenu_text, user_id) VALUES (?, ?, ?);", [titre, contenu_text, user_id], (error, results) => {
            if (error) throw error;
            results;
        });
    } 
};

exports.modify = (titre, contenu_text, contenu_media, id) => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("UPDATE Post SET titre = ?, contenu_text = ?, contenu_media = ? WHERE id = ?;", [titre, contenu_text, contenu_media, id], (error, results) => {
                if (results === undefined) {
                    reject ("Erreur dans la requête");
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
}

exports.delete = (id) => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("DELETE FROM Post WHERE id = ?;", [id], (error, results) => {
                if (results === undefined) {
                    reject ("Erreur dans la requête");
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

exports.onePost = (id) => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("SELECT Post.id, Post.titre, Post.contenu_text, Post.contenu_media, Post.date_post, Post.user_id, User.prenom, User.nom, User.role FROM Post INNER JOIN User ON Post.user_id = User.id WHERE Post.id = ?;", [id], (error, results) => {
                if (results === undefined) {
                    reject ("Erreur dans la requête");
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
        return new Promise((resolve, reject) => {
            connectionDB.query("SELECT Post.id, Post.titre, Post.contenu_text, Post.contenu_media, Post.date_post, Post.user_id, User.prenom, User.nom FROM Post INNER JOIN User ON Post.user_id = User.id;", (error, results) => {
                if (results === undefined) {
                    reject ("Erreur dans la requête");
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