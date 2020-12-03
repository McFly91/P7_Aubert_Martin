const postModel = require("../models/post");
const connectionDB = require("../connexion_mysql");

exports.onePost = (id) => {
    connectionDB.query("SELECT * FROM Post WHERE id = ?;", [id], function(error, results) {
        if (error) throw error;
        results = JSON.parse(JSON.stringify(results));
    })
};

exports.allPost = () => {
    connectionDB.query("SELECT * FROM Post;", function(error, results) {
        if (error) throw error;
        results = JSON.parse(JSON.stringify(results));
    })
};