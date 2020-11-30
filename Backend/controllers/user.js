const userModel = require("../models/user");
const MaskData = require('maskdata');
const bcrypt = require('bcrypt');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_secret);
const connectionDB = require("../connexion_mysql");


exports.signup = (req, res, next) => {

    const emailRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>]*([A-Za-z]|[^<>()\[\]\\\/,;:\s@]){3,}\@([A-Za-z]|[^<>()\[\]\\\/,;:\s@]){3,}\.([A-Za-z]|[^<>()\[\]\\\/.,;:\s@])[^@&"()!_$*€£`+=\/;?#<>]+$/;
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    const nameRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>]*[A-Za-z]{2,}[^@&()!_$*€£`+=\/;?#<>]*$/;
    
    let decryptedEmails = [];

    //userModel.encryptedEmails(decryptedEmails);

    connectionDB.query("SELECT email FROM User;", function(error, results) {
        if (error) throw error;
        results = JSON.parse(JSON.stringify(results));
        results.forEach((result => {
            let decryptedEmail = cryptr.decrypt(result.email);
            decryptedEmails.push(decryptedEmail);
        }));
        console.log(decryptedEmails);
        if (decryptedEmails.includes(req.body.email) === false) {

            if (nameRegex.test(req.body.nom) === true && nameRegex.test(req.body.prenom) === true && emailRegex.test(req.body.email) === true && passwordRegex.test(req.body.password) === true) {
                bcrypt.hash(req.body.password, 10)
                                .then(
                                    hash => { 
                                        userModel.userSchema(
                                            req.body.nom, 
                                            req.body.prenom, 
                                            cryptr.encrypt(req.body.email), 
                                            MaskData.maskEmail2(req.body.email), 
                                            hash);
                
                                        res.status(201).json({ message : "Utilisateur créé"});
                                })
                                .catch(error => res.status(500).json({ error }))
            }
            else if (nameRegex.test(req.body.nom) === false) {
                return res.status(401).json({ error : "Nom incorrect !"})
            }
            else if (nameRegex.test(req.body.prenom) === false) {
                return res.status(401).json({ error : "Prénom incorrect !"})
            }
            else if (emailRegex.test(req.body.email) === false) {
                return res.status(401).json({ error : "Email incorrect !"})
            }
            else if (passwordRegex.test(req.body.password) === false) {
                return res.status(401).json({ error : "Veuillez entrer un mot de passe contenant au moins 6 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 des caractères spéciaux !" })
            }
        }
        else {
            return res.status(400).json({ message : "Veuillez réessayer avec une autre adresse email"})
        }
    });
};
