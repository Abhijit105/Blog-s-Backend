const blogSchema = require('../model/blogSchema')

const createBlog = async function (req, res) {
  try {
    const { title, description } = req.body
    if (!title || !description)
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide title and description',
      })
    else {
      const newBlog = new blogSchema({
        title,
        description,
        user: req._id,
        username: req.username,
      })
      const result = await newBlog.save()
      res.status(201).json({
        status: 'success',
        message: 'Blog created successfully',
        data: result,
      })
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Blog not created successfully',
      error: err.message,
    })
  }
}

const getBlogById = async function (req, res) {
  try {
    const blogId = req.params.id
    const selectedBlog = await blogSchema.findById(blogId)
    res.status(200).json({
      status: 'success',
      message: 'Blog retrieved successfully',
      data: {blog: selectedBlog},
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Blog not retrieved successfully',
      error: err.message
    })
  }
}

module.exports = { createBlog, getBlogById }
