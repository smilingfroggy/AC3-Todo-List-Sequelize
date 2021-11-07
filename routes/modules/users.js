const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../../models')
const User = db.User
const router = express.Router()

// 登入頁
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('sent login')
})

// 註冊頁
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ where: {email}})
    .then(user => {
      if (user) {
        console.log('User already exists')
        return res.render('register', {
          name, email, password, confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))
        .then( () => res.redirect('/'))
        .catch( err => console.log(err))
    })
})

//登出
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router