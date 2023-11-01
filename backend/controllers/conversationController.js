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
      members: {$in: [req.user.id]}
    })
    res.status(200).json(conversation)
  } catch (error) {
    res.status(500)
    throw new Error('Could not grab conversations properly')
  }
})

// Delete a conversation
const deleteConversation = asyncHandler(async(req, res) => {
  const result = await Conversation.deleteOne({_id: req.params.id})

  if(result.deletedCount === 0){
    res.status(400)
    throw new Error('Failed to delete conversation')
  }

  res.status(200).json({id: req.params.id})
})
module.exports = {
  createConversation,
  getConversations,
  deleteConversation
}