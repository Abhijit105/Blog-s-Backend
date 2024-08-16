const express = require('express')
const {
  createBlog,
  getBlogById,
  getBlogs,
  updateBlogById,
} = require('../controller/BlogController')
const { isLogged } = require('../middleware/authentication')
const { isAuthorized } = require('../middleware/authorization')

const router = express.Router()

router.post('/', isLogged, createBlog)
router.get('/:id', getBlogById)
router.get('/', getBlogs)
router.patch('/:id', isAuthorized, updateBlogById)

module.exports = router
