const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors')
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
  methods:['GET', 'POST', 'DELETE']
}))

// User register logic
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/characters', require('./routes/characterRoutes'))
app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/conversations', require('./routes/conversationRoutes'))
app.use('/api/messages/', require('./routes/messageRoutes'))

// Serve frontend
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
}else{
  app.get('/', (req, res)=> res.send('Please set to production'))
}
//Error handler middleware, add in controller function body
app.use(errorHandler)
app.use(cors())


const server = app.listen(8080, '0.0.0.0', () => console.log(`Server started on port ${port}`))

// socket io
const io = require('socket.io')(server, {
  // pingTimeout: 60000,
  cors:{
    origin: "https://m-recruitment.onrender.com",
    methods: ["GET", "POST"]
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
