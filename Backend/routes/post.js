const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/post");
const likeCtrl = require("../controllers/like");
const commentCtrl = require("../controllers/comment");


router.post("/", auth, multer, postCtrl.createPost);

router.put("/:id", auth, multer, postCtrl.modifyPost);

router.delete("/:id", auth, postCtrl.deletePost);

router.get("/:id", auth, postCtrl.getOnePost);

router.get("/", auth, postCtrl.getAllPosts);

router.post("/:id/like", auth, likeCtrl.likePost);

router.get("/:id/like", auth, likeCtrl.allLikePost);

router.post("/:id/comment", auth, commentCtrl.newCommentPost);

router.put("/:id/comment/:idComment", auth, commentCtrl.modifyCommentPost);

router.delete("/:id/comment/:idComment", auth, commentCtrl.deleteCommentPost);

router.get("/:id/comment/:idComment", auth, commentCtrl.getOneComment);

router.get("/:id/comment", auth, commentCtrl.getAllComment);

module.exports = router;