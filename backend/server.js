const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors')

connectDB()

const app = express()
app.use(cors())
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


const server = app.listen(port, () => console.log(`Server started on port ${port}`))

// socket io
const io = require('socket.io')(server, {
  // pingTimeout: 60000,
  cors:{
    origin: "http://localhost:3000"
  }
})


let users = []

const addUser = (userId, socketId) => {
  !users.some(user=>user.userId === userId) && 
      users.push({userId, socketId})
}

const removeUser = (socketId) => {
  users = users.filter(user=>user.socketId !== socketId)
}

const getUser = (userId) => {
  return users.find(user=>user.userId === userId)
}

io.on('connect', (socket)=>{
  console.log('connected to socket.io')

  socket.on("addUser", userId=>{
    addUser(userId, socket.id)
    io.emit("getUsers", users)
  })

  socket.on("sendMessage", ({conversationID, sender, receiverId, text}) => {
    
    const other = getUser(receiverId)
    if(other){
      io.to(other.socketId).emit("getMessage", {
        conversationID: conversationID,
        sender: sender,
        text: text
      })
      
    }
    
  })

  socket.on("disconnect", () => {
    console.log("a user disconnect")
    removeUser(socket.id)
    io.emit("getUsers", users)
  })
})
