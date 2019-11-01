var express = require('express')
var router = express.Router()
const db = require("../models");
    router.get('/', function(req, res) {
        db.Topic.find({})
            .then(function(dbComment) {
                res.send(dbComment)
            })
            .catch(function(err) {
                res.send(err)
            })
    })
    
    router.post('/', function(req, res) {
        console.log('the req.body', req.body);
        db.Topic.create(req.body)
            .then(function(dbComment) {
                console.log('the db', dbComment);
                res.send(dbComment)
            })
            .catch(function(err) {
                console.log(err)
            })
    })

    router.post('/:id', function(req, res) {
        db.Comment.create({
            text: req.body.text
        })  
            .then(function(dbComment) {
                console.log(dbComment)
                return db.Topic.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: dbComment._id }}, { new: true });
        }).then(function(data) {
            console.log(data)
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
    });

    //when clicking the show comments button
    router.get('/:id', function(req, res) {
        db.Topic.findOne(
            {
                _id: req.params.id
            },
        )
        .populate('comments', 'text')
        .then(function(dbTopic) {
            console.log(dbTopic)
            res.send(dbTopic)
        })
        .catch(function(err) {
            res.send(err)
        });
    });

    router.delete('/:id', function(req, res) {
        db.Topic.findByIdAndRemove(req.params.id)
        .then(dbComment => {
            console.log('success')
            res.json(dbComment)
        })
        .catch(err => console.log(err));
    })

module.exports = router;