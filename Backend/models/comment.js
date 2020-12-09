const connectionDB = require("../connexion_mysql");

exports.newComment = (comment_post, user_id, post_id) => {
    connectionDB.query("INSERT INTO Comment (comment_post, user_id, post_id) VALUES (?, ?, ?);", [comment_post, user_id, post_id], (error, results) => {
        if (error) throw error;
        results;
    })
};

exports.modify = (comment_post, comment_id, post_id) => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("UPDATE Comment SET comment_post = ? WHERE id = ? AND post_id = ?;", [comment_post, comment_id, post_id], (error, results) => {
                if (results === undefined) {
                    reject ("Erreur dans la requête");
                }
                else {
                    resolve (results);
                };
            });
        });
    }
    catch (error) {
        console.log(error);
    };
};

exports.delete = (comment_id, post_id) => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("DELETE FROM Comment WHERE id = ? AND post_id = ?;", [comment_id, post_id], (error, results) => {
                if (results === undefined) {
                    reject ("Erreur dans la requête");
                }
                else {
                    resolve (results);
                };
            });
        });
    }
    catch (error) {
        console.log(error);
    };
};
