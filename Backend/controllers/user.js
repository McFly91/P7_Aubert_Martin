const userModel = require("../models/user");
const MaskData = require('maskdata');
const bcrypt = require('bcrypt');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_secret);
const jwt = require("jsonwebtoken");

let decryptedEmails = [];

exports.signup = (req, res, next) => {
    const emailRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>A-Z0-9]*([a-z]){1,}([a-zA-Z0-9]){2,}\@(groupomania.com|groupomania.fr)/;
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    const nameRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>]*[A-Za-z]{2,}[^@&()!_$*€£`+=\/;?#<>]*$/;

    userModel.encryptedEmailsSignup()
        .then(
            response => {
                response.forEach((result => {
                    let decryptedEmail = cryptr.decrypt(result.email);
                    decryptedEmails.push(decryptedEmail);
                }));
                if (decryptedEmails.includes(req.body.email) === false) {
                    if (nameRegex.test(req.body.nom) === true && nameRegex.test(req.body.prenom) === true && emailRegex.test(req.body.email) === true && passwordRegex.test(req.body.password) === true) {
                        bcrypt.hash(req.body.password, 10)
                                        .then(
                                            hash => { 
                                                userModel.userSchema(
                                                    cryptr.encrypt(req.body.nom), 
                                                    cryptr.encrypt(req.body.prenom),
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
                    return res.status(400).json({ error : "Veuillez réessayer avec une autre adresse email"})
                };
        })
        .catch((error) => {res.status(404).json({ error })})
};

exports.login = (req, res, next) => {
    userModel.encryptedEmailsLogin()
        .then(
            response => {
                response.forEach((result => {
                    let decryptedEmail = cryptr.decrypt(result.email);
                    decryptedEmails.push(decryptedEmail);
                }));
                for (let i = 0; i < response.length ; i++) {
                    if(decryptedEmails[i].includes(req.body.email) === true) {
                        return bcrypt.compare(req.body.password, response[i].password)
                            .then(
                                valid => {
                                    console.log(decryptedEmails[i], req.body.password, response[i].password)
                                    if (!valid) {
                                        return res.status(401).json({ error : "Email ou mot de passe incorrect" });
                                    }
                                    res.status(200).json({
                                        userId: response[i].id,
                                        token: jwt.sign(
                                            {userId: response[i].id},
                                            process.env.TOKEN_secret,
                                            {expiresIn: "24h"}
                                        )
                                    });
                            })
                            .catch(error => res.status(500).json({ error }))
                    }
                    else if (i === response.length - 1) {
                        return res.status(404).json({ error : "Email ou mot de passe incorrect" })
                    }
                };
            console.log(decryptedEmails);
        })
        .catch(() => { res.status(404).json({ message : "erreur" })})
};