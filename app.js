const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const routes = require('./routes')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = 3000

// set templates
app.engine('hbs', exphbs({ defaultLayout: "main", extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// session and passport
app.use(session({
  secret: 'MySecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)

// Routers
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})