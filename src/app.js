const express = require('express')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1/user', userRoutes)

module.exports = app
