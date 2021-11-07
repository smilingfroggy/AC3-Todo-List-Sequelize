const passport = require('passport')

module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    return res.redirect('/users/login')
  }
}