const connectionDB = require("../connexion_mysql");

const userSchema = (nom, prenom, email, email_mask, password) => 
    connectionDB.query("INSERT INTO User (nom, prenom, email, email_mask, password) VALUES (?, ?, ?, ?, ?);", [nom, prenom, email, email_mask, password], function(error, result) {
    if (error) throw error;
});

module.exports = userSchema;
