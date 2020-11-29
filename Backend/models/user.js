const connectionDB = require("../connexion_mysql");

exports.signup = (req, res, next) => {

    const emailRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>]*([A-Za-z]|[^<>()\[\]\\\/,;:\s@]){3,}\@([A-Za-z]|[^<>()\[\]\\\/,;:\s@]){3,}\.([A-Za-z]|[^<>()\[\]\\\/.,;:\s@])[^@&"()!_$*€£`+=\/;?#<>]+$/;
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    //let decryptedEmails = [];
    if (emailRegex.test(req.body.email) === true && passwordRegex.test(req.body.password) === true) {
        connectionDB.query("INSERT INTO User (nom, prenom, email, email_mask, password) VALUES (?, ?, ?, ?, ?);", [req.body.nom, req.body.prenom, req.body.email, req.body.email_mask, req.body.password], function(error, result) {
            if (error) throw error;
            res.status(201).json({ message : "Utilisateur créé"})
            console.log(result);
        });
    }
    else if (emailRegex.test(req.body.email) === false) {
        return res.status(401).json({ error : "Email incorrect !"})
    }
    else if (passwordRegex.test(req.body.password) === false) {
        return res.status(401).json({ error : "Veuillez entrer un mot de passe contenant au moins 6 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 des caractères spéciaux !" })
    }

};