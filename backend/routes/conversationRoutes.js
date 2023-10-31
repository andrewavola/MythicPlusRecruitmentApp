const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {createConversation, getConversations} = require('../controllers/conversationController')

// Create a new conversation
router.post('/', protect, createConversation)
router.get('/:id', protect, getConversations)


// Get conversations of current user



module.exports = router