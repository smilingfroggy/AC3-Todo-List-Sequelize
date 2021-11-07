const express = require('express')
const db = require('../../models')
const User = db.User
const Todo = db.Todo
const router = express.Router()

// create page
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const UserId = req.user.id  //model屬性名稱為UserId
  const name = req.body.name
  console.log('userId:', UserId)
  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => {
      todo = todo.toJSON()
      res.render('edit', { todo })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findByPk(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === "on"
      return todo.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// delete page
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => {
      console.log('to delete:', todo.name)
      return todo.destroy()
    })
    .then(() => { res.redirect('/') })
    .catch(error => { console.error(error) })
})

module.exports = router