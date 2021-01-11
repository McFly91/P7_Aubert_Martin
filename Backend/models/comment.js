const connectionDB = require("../connexion_mysql");

exports.newComment = (comment_post, user_id, post_id) => {
    connectionDB.query("INSERT INTO Comment (comment_post, user_id, post_id) VALUES (?, ?, ?);", [comment_post, user_id, post_id], (error, results) => {
        if (error) throw error;
        results;
    })
};

exports.modify = (comment_post, comment_id) => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("UPDATE Comment SET comment_post = ?, date_comment = CURRENT_TIMESTAMP WHERE id = ?;", [comment_post, comment_id], (error, results) => {
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

exports.oneComment = (comment_id) => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("SELECT * FROM Comment WHERE id = ?;", [comment_id], (error, results) => {
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

exports.allComment = (post_id) => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("SELECT Comment.id, Comment.comment_post, Comment.date_comment, Comment.post_id, Comment.user_id, User.prenom, User.nom, User.role FROM Comment INNER JOIN User ON Comment.user_id = User.id WHERE post_id = ?;", [post_id], (error, results) => {
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