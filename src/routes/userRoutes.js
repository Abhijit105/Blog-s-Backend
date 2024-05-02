const express = require('express')
const {
  signup,
  login,
  getUserInformation,
} = require('../controller/UserController')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/:id', getUserInformation)

module.exports = router
