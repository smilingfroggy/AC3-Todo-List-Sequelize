const express = require('express')
const db = require('../../models')
const User = db.User
const Todo = db.Todo
const router = express.Router()

// detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

module.exports = router