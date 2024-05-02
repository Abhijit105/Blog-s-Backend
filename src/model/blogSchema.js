const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
  },
  user: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
  },
})

module.exports = mongoose.model('blog', blogSchema)
