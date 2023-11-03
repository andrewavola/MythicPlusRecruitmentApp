const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// User register logic
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/characters', require('./routes/characterRoutes'))
app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/conversations', require('./routes/conversationRoutes'))
app.use('/api/messages/', require('./routes/messageRoutes'))

//Error handler middleware, add in controller function body
app.use(errorHandler)


app.listen(port, () => console.log(`Server started on port ${port}`))