const express = require('express')
const { createBlog } = require('../controller/BlogController')
const { isLogged } = require('../middleware/authentication')

const router = express.Router()

router.post('/', isLogged, createBlog)
router.get('/', (req, res) => console.log(res.send('Welcome to blog')))

module.exports = router
