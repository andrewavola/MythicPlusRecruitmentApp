const asyncHandler = require('express-async-handler')
const Message = require('../models/messageModel')

// Create a new message
const createMessage = asyncHandler(async(req, res) => {
  
  const {conversationID, sender, text} = req.body
  if(!conversationID || !sender || !text){
    res.status(400)
    throw new Error('Missing a field')
  }

  const newMessage = new Message(req.body)
  try {
    const savedMessage = await newMessage.save()
    res.status(200).json(savedMessage)
  } catch (error) {
    res.status(400)
    throw new Error('Could not create message properly')
  }
})


// Get all messages from current conversation
const getMessages = asyncHandler(async(req, res) => {
  try {
    const messages = await Message.find({
      conversationID: req.params.conversationID
    })
    res.status(200).json(messages)
  } catch (error) {
    res.status(400)
    throw new Error('Could not grab messages properly')
  }
  
})

module.exports = {
  createMessage,
  getMessages
}
