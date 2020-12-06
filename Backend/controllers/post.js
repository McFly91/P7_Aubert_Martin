const postModel = require("../models/post");
const fs = require("fs");
const { join } = require("path");

//Regex pour la vérification des données
const inputRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>]*[A-Za-z0-9]{1,}/;

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    const filename = req.file.filename;
    if (filename) {
            postObject.contenu_media = `${req.protocol}://${req.get("host")}/images/${filename}`;
    }
    if (inputRegex.test(postObject.titre) && (postObject.contenu_text === null || (postObject.contenu_text !== null && inputRegex.test(postObject.contenu_text)))) {
        postModel.postSchema(
            postObject.titre, 
            postObject.contenu_text, 
            postObject.contenu_media, 
            res.locals.userId);
        res.status(201).json({ message : "Post enregistrée" });
    }
    else {
        if (filename !== null) {
            fs.unlink(`images/${filename}`, () => {
                res.status(400);
            })
        }
        return res.status(400).json({ error : "Erreur dans l'entrée des données, veuillez rentrer des informations pertinantes" });
    }
};

exports.modifyPost = (req, res, next) => {
    
};

exports.deletePost = (req, res, next) => {
    postModel.onePost(req.params.id)
        .then(response => {
                if (res.locals.userId === response[0].user_post) {
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
                    res.status(404).json({ message : "Vous ne pouvez pas supprimer un Post qui ne vous appartient pas" })
                }
        })
        .catch(error => res.status(500).json(error))
};

exports.getOnePost = (req, res, next) => {
    postModel.onePost(req.params.id)
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).json({ error }))
};

exports.getAllPosts = (req, res, next) => {
    postModel.allPost()
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).json({ error }))
};

exports.likePost = (req, res, next) => {
    
};