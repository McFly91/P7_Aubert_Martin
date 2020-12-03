const postModel = require("../models/post");
const fs = require("fs");

//Regex pour la vérification des données
const inputTitreRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>]*[A-Za-z]{2,}[^@&()!_$*€£`+=\/;?#<>]*$/;
const inputRegex = /^[^\s@&"()!_$*€£`+=\/;?#<>]*[A-Za-z0-9]{1,}/;

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);

    const filename = req.file.filename;

};

exports.modifyPost = (req, res, next) => {
    
};

exports.deletePost = (req, res, next) => {
    
};

exports.getOnePost = (req, res, next) => {
    postModel.onePost(req.params.id);  
};

exports.getAllPosts = (req, res, next) => {
    postModel.allPost()
};

exports.likePost = (req, res, next) => {
    
};