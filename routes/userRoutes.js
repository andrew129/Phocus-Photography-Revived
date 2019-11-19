const router = require("express").Router();
// const userController = require("../../controllers/userController");
const passport = require('../../passport')
const User = require('../models/User')

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
          email: req.user.email
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

router.post('/logout', (req, res) => {
  if (req.user) {
      req.logout()
      res.send({ msg: 'logging out' })
  } else {
      res.send({ msg: 'no user to log out' })
  }
})

// router.route("/login").post(userController.findOne);

module.exports = router;