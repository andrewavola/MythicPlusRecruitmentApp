const asyncHandler = require('express-async-handler')
const Conversation = require('../models/conversationModel')

// Create a new conversation with another user
const createConversation = asyncHandler(async(req, res) => {

  const senderId = req.body.senderId
  const receiverId = req.body.receiverId

  const exists = await Conversation.findOne({
    members: {$all: [senderId, receiverId]}
  })

  if(exists){
    return res.status(200).json(exists)
  }

  const newConversation = new Conversation({
    members: [senderId, receiverId]
  })

  try {
    const savedConversation = await newConversation.save()
    res.status(200).json(savedConversation)
  } catch (error) {
      res.status(500)
      throw new Error('Could not create conversation properly')
  }
})


//Get all conversations for the current user
const getConversations = asyncHandler(async(req, res) => {
  try {
    const conversation = await Conversation.find({
      members: {$in: [req.params.id]}
    })
    res.status(200).json(conversation)
  } catch (error) {
    res.status(500)
    throw new Error('Could not grab conversations properly')
  }
})

module.exports = {
  createConversation,
  getConversations
}