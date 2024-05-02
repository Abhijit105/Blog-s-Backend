const jwt = require('jsonwebtoken')

const isLogged = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY)
    console.log(decodeToken)
    req._id = decodeToken._id
    req.username = decodeToken.username
    next()
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'User not authenticated successfully',
      error: err.message,
    })
  }
}

module.exports = { isLogged }
