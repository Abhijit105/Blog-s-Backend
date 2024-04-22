const express = require('express')
const router = express.Router()
const {
  signup,
  getUserInformation,
  login,
} = require('../controller/userController')

router.post('/signup', signup)
router.post('/login', login)
router.get('/:id', getUserInformation)

module.exports = router
