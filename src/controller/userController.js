const UserSchema = require('../model/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function signup(req, res) {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password)
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide username, email and password',
      })
    else {
      const hashedPassword = bcrypt.hashSync(password, 10)

      const newUser = new UserSchema({
        username,
        email,
        password: hashedPassword,
      })

      const result = await newUser.save()
      res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: { result },
      })
    }
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'User not created successfully',
      error: err.message,
    })
  }
}

async function getUserInformation(req, res) {
  try {
    const userId = req.params.id
    const selectedUser = await UserSchema.findById(userId)
    res.status(200).json({
      status: 'success',
      message: 'User retrieved successfully',
      data: {
        user: selectedUser,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'User not retrieved successfully',
      error: err.message,
    })
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password',
      })
    else {
      const user = await UserSchema.findOne({ email })
      if (!user)
        return res.status(404).json({
          status: 'fail',
          message: 'Email not found',
        })
      const passwordResult = bcrypt.compareSync(password, user.password)
      if (user && !passwordResult)
        return res
          .status(404)
          .json({ status: 'fail', message: 'Password not match' })
      const { username, _id } = user
      const token = jwt.sign({ username, _id }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      })
      res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        data: token,
      })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error, try after sometime',
    })
  }
}

module.exports = { signup, getUserInformation, login }
