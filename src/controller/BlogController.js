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

module.exports = { createBlog }
