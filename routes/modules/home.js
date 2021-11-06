const express = require('express')
const router = express.Router()

// index 首頁
router.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = router