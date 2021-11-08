const passport = require('passport')

module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入再使用')
    return res.redirect('/users/login')
  }
}