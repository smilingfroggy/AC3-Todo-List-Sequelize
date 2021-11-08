const express = require('express')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const db = require('../../models')
const User = db.User
const router = express.Router()

// 登入頁
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 註冊頁
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '兩次輸入的密碼不同' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        errors.push({ message: '此帳號已註冊過' })
        console.log('User already exists')
        return res.render('register', {
          errors, name, email, password, confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))
        .then(() => {
          req.flash({ success_msg: '您已成功註冊，請重新登入' })
          res.redirect('/')
        })
        .catch(err => console.log(err))
    })
})

//登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出')  //沒有作用
  res.redirect('/users/login')
})

module.exports = router