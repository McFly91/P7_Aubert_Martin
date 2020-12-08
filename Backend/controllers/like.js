const postModel = require("../models/post");
const likeModel = require("../models/like");
const fs = require("fs");

exports.likePost = (req, res, next) => {
    postModel.onePost(req.params.id)
        .then(response => {
            if (req.body.like === undefined) {
                return res.status(400).json({ message : "Le corps de la requête n'est pas conforme" })
            }
            else {
                likeModel.like(response[0].id)
                    .then(likes => {
                        let like_dislike_array = [];
                        let user_like_array =[];
                        likes.forEach((result => {
                            user_like_array.push(result.user_like);
                            like_dislike_array.push(result.like_dislike);
                        }));
                        if (req.body.like === 1) {
                            if (user_like_array.includes(res.locals.userId) && like_dislike_array.includes(1)) {
                                res.status(400).json({ message : "Impossible d'ajouter plusieurs Like" })
                            }
                            else if (like_dislike_array.includes(-1)) {
                                likeModel.modifyLike(1, response[0].id)
                                    .then(() => res.status(200).json({ message : "Dislike retiré / Like ajouté"}))
                                    .catch(error => res.status(500).json({ error }))
                            }
                            else {
                                likeModel.newLike(
                                    req.body.like, 
                                    res.locals.userId, 
                                    response[0].id
                                );
                                res.status(200).json({ message : "Like ajouté"});
                            }
                        }
                        else if (req.body.like === -1) {
                            if (user_like_array.includes(res.locals.userId) && like_dislike_array.includes(-1)) {
                                res.status(400).json({ message : "Impossible d'ajouter plusieurs Dislike" })
                            }
                            else if (like_dislike_array.includes(1)) {
                                likeModel.modifyLike(-1, response[0].id)
                                    .then(() => res.status(200).json({ message : "Like retiré / Dislike ajouté"}))
                                    .catch(error => res.status(500).json({ error }))
                            }
                            else {
                                likeModel.newLike(
                                    req.body.like, 
                                    res.locals.userId, 
                                    response[0].id
                                );
                                res.status(200).json({ message : "Dislike ajouté"});
                            }
                        }
                        else if (req.body.like === 0) {
                            likeModel.modifyUserLike(null, response[0].id)
                                .then(() => res.status(200).json({ message : "Like/Dislike retiré"}))
                                .catch(error => res.status(500).json({ error }))
                        }
                    })
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }))
};