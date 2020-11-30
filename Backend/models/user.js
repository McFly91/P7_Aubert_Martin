const connectionDB = require("../connexion_mysql");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_secret);

exports.userSchema = (nom, prenom, email, email_mask, password) => { 
    connectionDB.query("INSERT INTO User (nom, prenom, email, email_mask, password) VALUES (?, ?, ?, ?, ?);", [nom, prenom, email, email_mask, password], function(error, results) {
    if (error) throw error;
    });
};

exports.encryptedEmails = (array_emails) => {
    connectionDB.query("SELECT email FROM User;", function(error, results) {
        if (error) throw error;
        results = JSON.parse(JSON.stringify(results));
        results.forEach((result => {
            let decryptedEmail = cryptr.decrypt(result.email);
            array_emails.push(decryptedEmail);
        }));
        console.log(array_emails);
    });
}