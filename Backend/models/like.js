const connectionDB = require("../connexion_mysql");

exports.newLike = (like_dislike, user_like, like_post_id) => {
    connectionDB.query("INSERT INTO Like_dislike (like_dislike, user_like, like_post_id) VALUES (?, ?, ?);", [like_dislike, user_like, like_post_id], (error, results) => {
        if (error) throw error;
        results;
    });
};

exports.modifyLike = (valeurLike, like_post_id) => {
    try {
        return new Promise((resolve) => {
            connectionDB.query("UPDATE Like_dislike SET like_dislike = ? WHERE like_post_id = ?;", [valeurLike, like_post_id], (error, results) => {
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

exports.modifyUserLike = (user_like, like_post_id) => {
    try {
        return new Promise((resolve) => {
            connectionDB.query("UPDATE Like_dislike SET user_like = ? WHERE like_post_id = ?;", [user_like, like_post_id], (error, results) => {
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

exports.like = (like_post_id) => {
    try {
        return new Promise((resolve) => {
            connectionDB.query("SELECT user_like, like_dislike FROM Like_dislike WHERE like_post_id = ?;", [like_post_id], (error, results) => {
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