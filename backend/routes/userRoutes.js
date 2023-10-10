const express = require('express')
const router = express.Router()
const { registerUser, deleteUser, loginUser, getUser } = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUser)
router.delete('/delete', deleteUser)

module.exports = router