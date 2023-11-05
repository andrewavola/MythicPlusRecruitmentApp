const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {createMessage, getMessages, deleteAllMessages} = require('../controllers/messageController')

router.post('/', protect, createMessage)
router.get('/:conversationID', protect, getMessages)
router.delete('/:conversationID', protect, deleteAllMessages)

module.exports = router