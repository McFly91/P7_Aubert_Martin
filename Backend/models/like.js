const connectionDB = require("../connexion_mysql");

exports.newLike = (like_dislike, user_id, post_id) => {
    connectionDB.query("INSERT INTO Like_dislike (like_dislike, user_id, post_id) VALUES (?, ?, ?);", [like_dislike, user_id, post_id], (error, results) => {
        if (error) throw error;
        results;
    });
};

exports.modifyLike = (valeurLike, post_id) => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("UPDATE Like_dislike SET like_dislike = ? WHERE post_id = ?;", [valeurLike, post_id], (error, results) => {
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

exports.modifyUserLike = (user_id, post_id) => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("UPDATE Like_dislike SET user_id = ? WHERE post_id = ?;", [user_id, post_id], (error, results) => {
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

exports.like = (post_id, user_id) => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("SELECT like_dislike FROM Like_dislike WHERE post_id = ? AND user_id = ?;", [post_id, user_id], (error, results) => {
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