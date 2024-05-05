const express = require('express')
const {
  createBlog,
  getBlogById,
  getBlogs,
} = require('../controller/BlogController')
const { isLogged } = require('../middleware/authentication')

const router = express.Router()

router.post('/', isLogged, createBlog)
router.get('/:id', getBlogById)
router.get('/', getBlogs)

module.exports = router
