const express = require('express')
const router = express.Router()
const User = require('../../models/users')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { errorHandler } = require('../../middleware/errorHandler')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位皆為必填' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: '兩者密碼不相符！' })
  }

  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push({ message: '信箱已被註冊！' })
        return res.render('register', { errors, name, email, password, confirmPassword })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => {
          req.flash('success_msg', '註冊成功，歡迎登入使用！')
          res.redirect('/users/login')
        })
    })
    .catch(err => errorHandler(err, res))
})

router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', '已成功登出！')
  res.redirect('/users/login')
})

module.exports = router