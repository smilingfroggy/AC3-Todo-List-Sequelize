const express = require('express')
const db = require('../../models')
const User = db.User
const Todo = db.Todo
const router = express.Router()

// index 首頁
router.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router