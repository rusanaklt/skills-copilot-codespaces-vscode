// Create web server

var express = require('express');
var router = express.Router();

var Comments = require('../models/comments');

// GET /api/comments
// Get all comments
router.get('/', function(req, res) {
    Comments.find({}, function(err, comments) {
        if (err) throw err;

        res.json(comments);
    });
});

// GET /api/comments/:id
// Get a comment by id
router.get('/:id', function(req, res) {
    Comments.findOne({_id: req.params.id}, function(err, comment) {
        if (err) throw err;

        res.json(comment);
    });
});

// POST /api/comments
// Create a comment
router.post('/', function(req, res) {
    var newComment = Comments({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    newComment.save(function(err) {
        if (err) throw err;

        res.json({message: 'Comment created!'});
    });
});

// PUT /api/comments/:id
// Update a comment
router.put('/:id', function(req, res) {
    Comments.findOne({_id: req.params.id}, function(err, comment) {
        if (err) throw err;

        comment.name = req.body.name;
        comment.email = req.body.email;
        comment.message = req.body.message;

        comment.save(function(err) {
            if (err) throw err;

            res.json({message: 'Comment updated!'});
        });
    });
});

// DELETE /api/comments/:id
// Delete a comment
router.delete('/:id', function(req, res) {
    Comments.remove({_id: req.params.id}, function(err, comment) {
        if (err) throw err;

        res.json({message: 'Comment deleted!'});
    });
});

module.exports = router;