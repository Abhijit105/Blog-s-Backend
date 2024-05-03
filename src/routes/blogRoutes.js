const express = require('express')
const { createBlog, getBlogById } = require('../controller/BlogController')
const { isLogged } = require('../middleware/authentication')

const router = express.Router()

router.post('/', isLogged, createBlog)
router.get('/:id', getBlogById)

module.exports = router
