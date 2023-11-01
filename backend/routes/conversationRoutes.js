const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {createConversation, getConversations, deleteConversation} = require('../controllers/conversationController')

// Create a new conversation
router.post('/', protect, createConversation)
router.get('/getConversations', protect, getConversations)
router.delete('/:id', protect, deleteConversation)


// Get conversations of current user



module.exports = router