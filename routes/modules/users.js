const express = require('express')
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
  res.send('sent register')
})

//登出
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router