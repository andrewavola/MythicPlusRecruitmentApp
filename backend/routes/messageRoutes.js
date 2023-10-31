const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {createMessage, getMessages} = require('../controllers/messageController')

router.post('/', protect, createMessage)
router.get('/:conversationID', protect, getMessages)





module.exports = router