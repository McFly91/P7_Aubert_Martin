const userModel = require("../models/user");
const fs = require("fs");
const MaskData = require('maskdata');
const bcrypt = require('bcrypt');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_secret);
const jwt = require("jsonwebtoken");

let decryptedEmails = [];
let avatarsList = [];
const emailRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>A-Z0-9]*([a-z]){1,}([a-zA-Z0-9]){2,}\@(groupomania.com|groupomania.fr)/;
const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
const nameRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>]*[A-Za-z]{2,}[^@&()!_$*€£`+=\/;?#<>]*$/;

exports.avatars = (req, res, next) => {
    fs.readdir("../Backend/images/avatars", (error, files) => {
        if (error) throw error;
        files.forEach(file => {
            avatarsList.push(file);
            avatarsList = Array.from(new Set(avatarsList));
        })
        res.status(200).json(avatarsList); 
    });
};

exports.signup = (req, res, next) => {
    userModel.selectEncryptedEmail()
        .then(
            response => {
                response.forEach((result => {
                    let decryptedEmail = cryptr.decrypt(result.email);
                    decryptedEmails.push(decryptedEmail);
                }));
                
               //let avatar = `${req.protocol}://${req.get("host")}/images/avatars/${req.body.avatar}`;

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
                                                    hash,
                                                    `${req.protocol}://${req.get("host")}/images/avatars/${req.body.avatar}`);
                        
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
    userModel.selectEncryptedEmailPassword()
        .then(
            response => {
                response.forEach((result => {
                    let decryptedEmail = cryptr.decrypt(result.email);
                    decryptedEmails.push(decryptedEmail);
                }));
                for (let i = 0; i < response.length; i++) {
                    if(decryptedEmails[i].includes(req.body.email) === true) {
                        return bcrypt.compare(req.body.password, response[i].password)
                            .then(
                                valid => {
                                    if (!valid) {
                                        return res.status(401).json({ error : "Email ou mot de passe incorrect" });
                                    }
                                    res.status(200).json({
                                        userId: response[i].id,
                                        role: response[i].role,
                                        token: jwt.sign(
                                            {userId: response[i].id,
                                            role: response[i].role},
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
        })
        .catch((error) => {res.status(404).json({ error })})
};

exports.modifyUserInfos = (req, res, next) => {
    userModel.oneUser(res.locals.userId)
        .then(
            response => {
                let decryptedResponses = []
                response.forEach((result => {
                    let decryptedResponse = {
                        id: result.id,
                        nom: cryptr.decrypt(result.nom),
                        prenom: cryptr.decrypt(result.prenom),
                        email: cryptr.decrypt(result.email)
                    }
                    decryptedResponses.push(decryptedResponse);
                }));
                userModel.selectEncryptedEmail()
                    .then(
                        responseEncryptedEmail => {
                            responseEncryptedEmail.forEach((result => {
                                let decryptedEmail = cryptr.decrypt(result.email);
                                decryptedEmails.push(decryptedEmail);
                            }));
                            if ((decryptedEmails.includes(req.body.email) === false) || (req.body.email === decryptedResponses[0].email)) {
                                if (res.locals.userId === decryptedResponses[0].id) {
                                    if (nameRegex.test(req.body.nom) === true && nameRegex.test(req.body.prenom) === true && emailRegex.test(req.body.email) === true) {
                                        userModel.modifyInfos(
                                            cryptr.encrypt(req.body.nom), 
                                            cryptr.encrypt(req.body.prenom),
                                            cryptr.encrypt(req.body.email), 
                                            MaskData.maskEmail2(req.body.email),
                                            res.locals.userId
                                        )
                                            .then(() => res.status(200).json({ message : "Infos utilisateur modifiés"}))
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
                                }
                            }
                            else {
                                return res.status(400).json({ error : "Veuillez réessayer avec une autre adresse email"})
                            };
                    })
                    .catch((error) => {res.status(404).json({ error })})
        })
        .catch(error => res.status(500).json({ error }))
};

exports.modifyUserPassword = (req, res, next) => {
    userModel.oneUser(res.locals.userId)
        .then(
            response => {
                if (res.locals.userId === response[0].id) {
                    if (passwordRegex.test(req.body.password) === true) {
                        bcrypt.hash(req.body.password, 10)
                            .then(
                                hash => {
                                    userModel.modifyPassword(hash, res.locals.userId)
                                        .then(() => res.status(200).json({ message : "Mot de passe modifié"}))
                                        .catch(error => res.status(500).json({ error }))
                            })
                            .catch(error => res.status(500).json({ error }))
                    }
                    else {
                        return res.status(401).json({ error : "Veuillez entrer un mot de passe contenant au moins 6 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 des caractères spéciaux !"})
                    }
                };
        })
    .catch((error) => {res.status(404).json({ error })})
};

exports.deleteUser = (req, res, next) => {
    userModel.oneUser(res.locals.userId)
        .then(
            response => {
                if (response[0].id === res.locals.userId || res.locals.role === "admin") {
                    userModel.delete(res.locals.userId)
                        .then(() => res.status(200).json({ message : "Utilisateur supprimé"}))
                        .catch(error => res.status(500).json({ error }))
                }
            })
        .catch(error => res.status(500).json({ error }))
};

exports.getOneUser = (req, res, next) => {
    userModel.oneUser(res.locals.userId)
        .then(
            response => {
                let decryptedResponses = []
                response.forEach((result => {
                    let decryptedResponse = {
                        id: result.id,
                        nom: cryptr.decrypt(result.nom),
                        prenom: cryptr.decrypt(result.prenom),
                        email: cryptr.decrypt(result.email),
                        avatar: result.avatar
                    }
                    decryptedResponses.push(decryptedResponse);
                }));
                res.status(200).json(decryptedResponses);
            })
        .catch(error => res.status(500).json({ error }))
};