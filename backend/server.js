const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/users', require('./routes/userRoutes'))

//Error handler middleware, add in controller function body
app.use(errorHandler)


app.listen(port, () => console.log(`Server started on port ${port}`))