const postModel = require("../models/post");
const fs = require("fs");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_secret);

//Regex pour la vérification des données
const inputRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>]*[A-Za-z0-9]{1,}/;

exports.createPost = (req, res, next) => {
    let postObject = req.body;
    let filename;
    if (req.file) {
        filename = req.file.filename;
        postObject = JSON.parse(req.body.post);
            postObject.contenu_media = `${req.protocol}://${req.get("host")}/images/${filename}`;
    }
    console.log(postObject);
    if (inputRegex.test(postObject.titre) && (postObject.contenu_text === "" || (postObject.contenu_text !== "" && inputRegex.test(postObject.contenu_text)))) {
        postModel.postSchema(
            postObject.titre, 
            postObject.contenu_text, 
            postObject.contenu_media, 
            res.locals.userId);
        res.status(201).json({ message : "Post enregistrée" });
    }
    else {
        if (req.file) {
            fs.unlink(`images/${filename}`, () => {
                console.log("Image non enregistrée");
            })
        }
        return res.status(400).json({ error : "Erreur dans l'entrée des données, veuillez rentrer des informations pertinantes" });
    }
};

exports.modifyPost = (req, res, next) => {
    postModel.onePost(req.params.id)
        .then(response => {
                if (res.locals.userId === response[0].user_id) {
                    const postObject = req.file ?
                        {
                            ...JSON.parse(req.body.post),
                            contenu_media : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                        }  : { ...req.body };
                    if (inputRegex.test(postObject.titre) && (postObject.contenu_text === "" || (postObject.contenu_text !== "" && inputRegex.test(postObject.contenu_text)))) {
                        if (req.file) {
                            const filename = response[0].contenu_media.split("/images/")[1];
                            fs.unlink(`images/${filename}`, () => {
                                console.log("Ancienne image remplacée");
                            });
                        }
                        postModel.modify(postObject.titre, postObject.contenu_text, postObject.contenu_media, req.params.id)
                            .then(() => res.status(200).json({ message : "Post modifié" }))
                            .catch(error => res.status(500).json({ error }))
                    }
                    else {
                        if (req.file) {
                            fs.unlink(`images/${req.file.filename}`, () => {
                                console.log("Nouvelle image non enregistrée");
                            });
                        }
                        return res.status(400).json({ error : "Erreur dans l'entrée des données, veuillez rentrer des informations pertinantes" });
                    }
                }
                else {
                    res.status(404).json({ message : "Vous ne pouvez pas modifier un Post qui ne vous appartient pas" })
                }
            })
        .catch(error => res.status(500).json({ error }))
};

exports.deletePost = (req, res, next) => {
    postModel.onePost(req.params.id)
        .then(response => {
                if ((res.locals.userId === response[0].user_id) || (res.locals.role === "admin")) {
                    if (response[0].contenu_media !== null) {
                        const filename = response[0].contenu_media.split("/images/")[1];
                        fs.unlink(`images/${filename}`, () => {
                            res.status(200);
                        })
                    }
                    postModel.delete(req.params.id)
                        .then(() => res.status(200).json({ message : "Post supprimé"}))
                        .catch(error => res.status(500).json({ error }))
                }  
                else {
                    res.status(404).json({ error : "Vous ne pouvez pas supprimer un Post qui ne vous appartient pas" })
                }
        })
        .catch(error => res.status(500).json({ error }))
};

exports.getOnePost = (req, res, next) => {
    postModel.onePost(req.params.id)
        .then(response => {
            let decryptedResponses = []
            response.forEach((result => {
                let decryptedResponse = {
                    id: result.id,
                    titre: result.titre,
                    contenu_text: result.contenu_text,
                    contenu_media: result.contenu_media,
                    date_post: result.date_post,
                    user_id: result.user_id,
                    post_id: result.post_id,
                    role: result.role,
                    nom: cryptr.decrypt(result.nom),
                    prenom: cryptr.decrypt(result.prenom)
                }
                decryptedResponses.push(decryptedResponse);
            }));
            res.status(200).json(decryptedResponses);
        })
        .catch(error => res.status(500).json({ error }))
};

exports.getAllPosts = (req, res, next) => {
    postModel.allPost()
        .then(response => {
            let decryptedResponses = []
            response.forEach((result => {
                let decryptedResponse = {
                    id: result.id,
                    titre: result.titre,
                    contenu_text: result.contenu_text,
                    contenu_media: result.contenu_media,
                    date_post: result.date_post,
                    user_id: result.user_id,
                    post_id: result.post_id,
                    nom: cryptr.decrypt(result.nom),
                    prenom: cryptr.decrypt(result.prenom)
                }
                decryptedResponses.push(decryptedResponse);
            }));
            res.status(200).json(decryptedResponses);
        })
        .catch(error => res.status(500).json({ error }))
};