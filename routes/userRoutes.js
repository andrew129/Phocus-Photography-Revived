const router = require("express").Router();
const passport = require('../passport')
const User = require('../models/User')
const db = require('../models')
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

router.post('/', (req, res) => {
  console.log('user signup');

  const { email, password, first_name, last_name } = req.body
  // ADD VALIDATION
  User.findOne({ email: email }, (err, user) => {
      if (err) {
          console.log('User.js post error: ', err)
      } else if (user) {
          res.json({
              error: `Sorry, already a user with the email: ${email}`
          })
      }
      else {
          const newUser = new User({
              email: email,
              password: password,
              first_name: first_name,
              last_name: last_name
          })
          newUser.save((err, savedUser) => {
              if (err) return res.json(err)
              res.json(savedUser)
          })
      }
  })
})

router.post(
  '/login',
  function (req, res, next) {
      console.log('routes/user.js, login, req.body: ');
      console.log(req.body)
      next()
  },
  passport.authenticate('local'),
  (req, res) => {
      console.log('logged in', req.user);
      var userInfo = {
          email: req.user.email,
          first_name: req.user.first_name,
          last_name: req.user.last_name
      };
      res.send(userInfo);
  }
)

router.get('/', (req, res, next) => {
  console.log('===== user!!======')
  console.log(req.user)
  if (req.user) {
      res.json({ user: req.user })
  } else {
      res.json({ user: null })
  }
})

// router.route('/:id')
//     .post(upload.single('imageData'), (req, res, next) => {
//         console.log(req.body)
//         db.Image.create({
//             imageName: req.body.imageName,
//             imageData: req.file.path
//         })
//         .then(function(dbImage) {
//             console.log(dbImage)
//             return User.findOneAndUpdate({ _id: req.params.id }, { $push: { images: dbImage._id }}, { new: true });
//         })
//         .then(function(data) {
//             res.json(data)
//         })
//         .catch(function(err) {
//             res.json(err)
//         })
//     })

router.post('/logout', (req, res) => {
  if (req.user) {
      req.logout()
      res.send({ msg: 'logging out' })
  } else {
      res.send({ msg: 'no user to log out' })
  }
})

module.exports = router;
