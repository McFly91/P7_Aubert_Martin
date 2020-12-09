const connectionDB = require("../connexion_mysql");

exports.like = (user_id, post_id) => {
    try {
        return new Promise((resolve, reject) => {
            //connectionDB.query("SELECT like_dislike FROM Like_dislike WHERE post_id = ? AND user_id = ?;", [post_id, user_id], (error, results) => {
            connectionDB.query("CALL user_id_in_like(?, ?);", [user_id, post_id], (error, results) => {
                if (results === undefined) {
                    reject ("Erreur dans la requête");
                }
                else {
                    connectionDB.query("SELECT like_dislike FROM Like_dislike WHERE post_id = ? AND user_id = ?;", [post_id, user_id], (error, result) => {
                        if (result === undefined) {
                            reject ("Erreur dans la requête");
                        }
                        else {
                            resolve (result)
                        }
                    })
                }
            });
        });
    }
    catch (error) {
        console.log(error);
    };
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