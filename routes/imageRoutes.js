const express = require('express')
const Image = require('../models/Image')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.route('/')
    .post(upload.single('imageData'), (req, res, next) => {
        console.log(req.body)
        const newImage = new Image({
            imageName: req.body.imageName,
            imageData: req.file.path,
            name: req.body.name
        });

        newImage.save()
            .then((result) => {
                console.log(result);
                res.status(200).json({
                    success: true,
                    document: result
                })
            })
            .catch((err) => next(err))
    })

    router.get('/', (req, res) => {
        Image.find({})
            .then((dbImage) => {
                console.log(dbImage)
                res.send(dbImage)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).end()
            })
    })

    router.get('/:id', function(req, res) {
        Image.findOne(
            {
                _id: req.params.id
            }
        )
        .then(function(dbImage) {
            console.log(dbImage)
            res.send(dbImage)
        })
        .catch(function(err) {
            res.send(err)
        });
    })

    router.delete('/:id', function(req, res) {
        Image.findByIdAndRemove(req.params.id)
        .then(dbImage => {
            console.log('success')
            res.json(dbImage)
        })
        .catch(err => console.log(err));
    })
    
    router.put('/:id', function(req, res) {
        Image.findOneAndUpdate({ _id: req.params.id }, { $set: { likes: req.body.likes, dislikes: req.body.dislikes }}, { new: true })
        .then(dbImage => {
            res.send(dbImage)
            console.log(dbImage)
        })
        .catch(err => {
            console.log(err)
        })
       
    })

module.exports = router;