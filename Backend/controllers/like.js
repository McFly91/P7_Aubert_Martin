const postModel = require("../models/post");
const likeModel = require("../models/like");

exports.likePost = (req, res, next) => {
    const userId = res.locals.userId;
    postModel.onePost(req.params.id)
        .then(response => {
            if ((req.body.like !== 1) && (req.body.like !== -1) && (req.body.like !== 0)) {
                return res.status(400).json({ message : "Le corps de la requête n'est pas conforme" })
            }
            else {
                likeModel.like(userId, response[0].id)
                    .then(likes => {
                        if (req.body.like === 1) {
                            if (likes[0].like_dislike === 1) {
                                likeModel.modifyLike(0, userId, response[0].id)
                                    .then((response) => res.status(200).json(response))
                                    .catch(error => res.status(500).json({ error }))
                            }
                            else if (likes[0].like_dislike === -1) {
                                likeModel.modifyLike(1, userId, response[0].id)
                                    .then((response) => res.status(200).json(response))
                                    .catch(error => res.status(500).json({ error }))
                            }
                            else {
                                likeModel.modifyLike(1, userId, response[0].id)
                                    .then((response) => res.status(200).json(response))
                                    .catch(error => res.status(500).json({ error }))
                            }
                        }
                        else if (req.body.like === -1) {
                            if (likes[0].like_dislike === -1) {
                                likeModel.modifyLike(0, userId, response[0].id)
                                    .then((response) => res.status(200).json(response))
                                    .catch(error => res.status(500).json({ error }))
                            }
                            else if (likes[0].like_dislike === 1) {
                                likeModel.modifyLike(-1, userId, response[0].id)
                                    .then((response) => res.status(200).json(response))
                                    .catch(error => res.status(500).json({ error }))
                            }
                            else {
                                likeModel.modifyLike(-1, userId, response[0].id)
                                    .then((response) => res.status(200).json(response))
                                    .catch(error => res.status(500).json({ error }))
                            }
                        }
                        else if (req.body.like === 0) {
                            likeModel.modifyLike(0, userId, response[0].id)
                                .then((response) => res.status(200).json(response))
                                .catch(error => res.status(500).json({ error }))
                        }
                    })
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }))
};

exports.allLikePost = (req, res, next) => {
    postModel.onePost(req.params.id)
        .then(response => {
            likeModel.allLike(response[0].id)
                .then(response => res.status(200).json(response))
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}