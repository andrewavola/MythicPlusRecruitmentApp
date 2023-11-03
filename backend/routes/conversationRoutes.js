const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {createConversation, getConversations, deleteConversation} = require('../controllers/conversationController')


router.post('/', protect, createConversation)
router.get('/getConversations', protect, getConversations)
router.delete('/:id', protect, deleteConversation)






module.exports = router