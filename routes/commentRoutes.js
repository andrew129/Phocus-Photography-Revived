var express = require('express')
var router = express.Router()
const db = require("../models");
    router.get('/', function(req, res) {
        db.Comment.find({})
            .then(function(dbComment) {
                res.send(dbComment)
            })
            .catch(function(err) {
                res.send(err)
            })
    })
    
    router.post('/', function(req, res) {
        console.log('the req.body', req.body);
        db.Comment.create(req.body)
            .then(function(dbComment) {
                console.log('the db', dbComment);
                res.send(dbComment)
            })
            .catch(function(err) {
                console.log(err)
            })
    })

module.exports = router;