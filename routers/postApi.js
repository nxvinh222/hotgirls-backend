const express = require('express');
const PostApiRouter = express.Router();

const PostModel = require('../models/post');

PostApiRouter.get("/", function (req, res) {
    PostModel.find({})
        .populate('author', '-password')
        .exec(function (err, post) {
            if (err) res.json({ success: false, err })
            else res.json({ success: true, data: post })
        })
})

PostApiRouter.post("/:id", function (req, res) {
    let { id } = req.params;
    req.body.author = id;
    PostModel.create(req.body, function (err, CreatedPost) {
        if (err) res.json({ success: false, err })
        else {
            // CreatedPost.author = id;
            res.json({ success: true, data: CreatedPost })
        };
    })
    // UserModel.findById(id)
    // .populate('author')
    // .exec() 
})

PostApiRouter.get("/:id", function (req, res) {
    let { id } = req.params;
    PostModel.findById(id)
        .populate("author")
        .populate("comment.createdBy")
        .exec(function (err, postFound) {
            if (err) res.json({ success: false, err: 'not found!' })
            else if (!postFound) res.json({ success: false, err })
            else res.json({ success: true, data: postFound })
        })
})

PostApiRouter.put("/:id", function (req, res) {
    let { id } = req.params;
    PostModel.findById(id, function (err, postFound) {
        if (err) res.json({ success: false, err: 'not found!' })
        else if (!postFound) res.json({ success: false, err })
        else {
            for (let key in req.body) {
                value = req.body[key];
                if (value !== null)
                    postFound[key] = value;
            }
            postFound.save(function (err, postUpdated) {
                if (err) res.json({ success: false, err })
                else res.json({ success: true, data: postFound })

            });
            // res.json({ success: true, data: postFound })
        }
    })
})

PostApiRouter.delete("/:id", function (req, res) {
    let { id } = req.params;
    PostModel.findById(id, function (err, postFound) {
        if (err) res.json({ success: false, err: "not found" })
        else if (!postFound) res.json({ success: false, err })
        else {
            postFound.remove(function (err) {
                if (err) res.json({ success: false, err })
                else res.json({ success: true })
            })
        }
    })
})

module.exports = PostApiRouter;