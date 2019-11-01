var express = require('express')
var router = express.Router()
const db = require("../models");
//when submitting the comment form
router.post('/', function(req, res) {
    db.Comment.create(req.body)
        .then(function(dbComment) {
            return db.Topic.findOneAndUpdate({ _id: req.params.id }, {$push: { comments: dbComment._id }}, { new: true });
    }).then(function(data) {
        console.log(data)
        res.json(data);
    }).catch(function(err) {
        res.json(err);
    });
});

module.exports = router;