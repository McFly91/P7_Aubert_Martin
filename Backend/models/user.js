const connectionDB = require("../connexion_mysql");

exports.userSchema = (nom, prenom, email, email_mask, password) => { 
    connectionDB.query("INSERT INTO User (nom, prenom, email, email_mask, password) VALUES (?, ?, ?, ?, ?);", [nom, prenom, email, email_mask, password], (error, results) => {
    if (error) throw error;
    });
};

exports.selectEncryptedEmail = () => {
    try {
        return new Promise((resolve) => {
            connectionDB.query("SELECT email FROM User;", (error, results) => {
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

exports.selectEncryptedEmailPassword = () => {
    try {
        return new Promise((resolve) => {
            connectionDB.query("SELECT id, email, password, role FROM User;", (error, results) => {
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

exports.modify = (nom, prenom, email, email_mask, user_id) => {
    try {
        return new Promise((resolve) => {
            connectionDB.query("UPDATE User SET nom = ?, prenom = ?, email = ?, email_mask = ? WHERE id = ?;", [nom, prenom, email, email_mask, user_id], (error, results) => {
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

exports.oneUser = (user_id) => {
    try {
        return new Promise((resolve) => {
            connectionDB.query("SELECT id, nom, prenom, email FROM User WHERE id = ?;", [user_id], (error, results) => {
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