const connectionDB = require("../connexion_mysql");

exports.userSchema = (nom, prenom, email, email_mask, password) => { 
    connectionDB.query("INSERT INTO User (nom, prenom, email, email_mask, password) VALUES (?, ?, ?, ?, ?);", [nom, prenom, email, email_mask, password], (error, results) => {
    if (error) throw error;
    });
};

exports.encryptedEmailsSignup = () => {
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

exports.encryptedEmailsLogin = () => {
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