const connectionDB = require("../connexion_mysql");

exports.userSchema = (nom, prenom, email, email_mask, password, avatar) => { 
    connectionDB.query("INSERT INTO User (nom, prenom, email, email_mask, password, avatar) VALUES (?, ?, ?, ?, ?, ?);", [nom, prenom, email, email_mask, password, avatar], (error, results) => {
    if (error) throw error;
    });
};

exports.selectEncryptedEmail = () => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("SELECT email FROM User;", (error, results) => {
                if (results === undefined) {
                    reject (error = "Erreur dans la requête");
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
        return new Promise((resolve, reject) => {
            connectionDB.query("SELECT id, email, password, role FROM User;", (error, results) => {
                if (results === undefined) {
                    reject (error = "Erreur dans la requête");
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

exports.modifyAvatar = (avatar, user_id) => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("UPDATE User SET avatar = ? WHERE id = ?;", [avatar, user_id], (error, results) => {
                if (results === undefined) {
                    reject (error = "Erreur dans la requête");
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

exports.modifyInfos = (nom, prenom, email, email_mask, user_id) => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("UPDATE User SET nom = ?, prenom = ?, email = ?, email_mask = ? WHERE id = ?;", [nom, prenom, email, email_mask, user_id], (error, results) => {
                if (results === undefined) {
                    reject (error = "Erreur dans la requête");
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

exports.modifyPassword = (password, user_id) => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("UPDATE User SET password = ? WHERE id = ?;", [password, user_id], (error, results) => {
                if (results === undefined) {
                    reject (error = "Erreur dans la requête");
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

exports.delete = (user_id) => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("DELETE FROM User WHERE id = ?;", [user_id], (error, results) => {
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

exports.oneUser = (user_id) => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("SELECT id, nom, prenom, email, avatar FROM User WHERE id = ?;", [user_id], (error, results) => {
                if (results === undefined) {
                    reject (error = "Erreur dans la requête");
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

exports.allUsers = () => {
    try {
        return new Promise((resolve, reject) => {
            connectionDB.query("SELECT id, nom, prenom, email FROM User WHERE role = 'user';", (error, results) => {
                if (results === undefined) {
                    reject (error = "Erreur dans la requête");
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