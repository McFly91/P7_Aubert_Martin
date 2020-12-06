const postModel = require("../models/post");
const fs = require("fs");

//Regex pour la vérification des données
const inputTitreRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>]*[A-Za-z]{2,}[^@&()!_$*€£`+=\/;?#<>]*$/;
const inputRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>]*[A-Za-z0-9]{1,}/;

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    const filename = req.file.filename;
    if (filename) {
            postObject.contenu_media = `${req.protocol}://${req.get("host")}/images/${filename}`;
    }
    console.log(postObject)
    if (inputTitreRegex.test(postObject.titre) && (postObject.contenu_text === null || (postObject.contenu_text !== null && inputRegex.test(postObject.contenu_text)))) {
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