const db = require("../models");

module.exports = function(app) {
    app.get('/api/comments', function(req, res) {
        db.Comment.find({})
            .then(function(dbComment) {
                res.json(dbComment)
            })
            .catch(function(err) {
                res.json(err)
            })
    })
    
    app.post('/api/comments', function(req, res) {
        db.Comment.create(req.body)
            .then(function(dbComment) {
                console.log(dbComment)
                res.json(dbComment)
            })
            .catch(function(err) {
                console.log(err)
            })
            location.reload()
    })
}
