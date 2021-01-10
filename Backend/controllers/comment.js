const postModel = require("../models/post");
const commentModel = require("../models/comment");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_secret);

//Regex pour la vérification des données
const inputRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>]*[A-Za-z0-9]{1,}/;

exports.newCommentPost = (req, res, next) => {
    postModel.onePost(req.params.id)
        .then(response => {
            if (inputRegex.test(req.body.comment_post)) {
                commentModel.newComment(
                    req.body.comment_post,
                    res.locals.userId,
                    response[0].id);
                res.status(201).json({ message : "Commentaire enregistré" });
            }
            else {
                return res.status(400).json({ error : "Erreur dans l'entrée des données, veuillez rentrer des informations pertinantes" });
            }
        })
        .catch(error => res.status(500).json({ error }))
};

exports.modifyCommentPost = (req, res, next) => {
    postModel.onePost(req.params.id)
        .then(response => {
            if (inputRegex.test(req.body.comment_post)) {
                commentModel.modify(
                    req.body.comment_post,
                    req.params.idComment,
                    res.locals.userId,
                    response[0].id)
                    .then(() => res.status(200).json({ message : "Commentaire modifié" }))
                    .catch(error => res.status(500).json({ error }))
            }
            else {
                return res.status(400).json({ error : "Erreur dans l'entrée des données, veuillez rentrer des informations pertinantes" });
            }
        })
        .catch(error => res.status(500).json({ error }))
};

exports.deleteCommentPost = (req, res, next) => {
    commentModel.oneComment(req.params.idComment)
        .then(response => {
            console.log(response[0]);
            if ((res.locals.userId === response[0].user_id) || (res.locals.role === "admin")) {
                commentModel.delete(req.params.idComment, response[0].post_id)
                    .then(() => res.status(200).json({ message : "Commentaire supprimé"}))
                    .catch(error => res.status(500).json({ error }))
            }
            else {
                res.status(404).json({ error : "Vous ne pouvez pas supprimer un Commentaire qui ne vous appartient pas" })
            }
        })
        .catch(error => res.status(500).json({ error }))
};

exports.getOneComment = (req, res, next) => {
    commentModel.oneComment(req.params.idComment)
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).json({ error }))
};

exports.getAllComment = (req, res, next) => {
    commentModel.allComment(req.params.id)
        .then(response => {
            let decryptedResponses = []
            response.forEach((result => {
                let decryptedResponse = {
                    id: result.id,
                    comment_post: result.comment_post,
                    date_comment: result.date_comment,
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