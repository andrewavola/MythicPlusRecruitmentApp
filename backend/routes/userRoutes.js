const express = require('express')
const router = express.Router()
const { registerUser, deleteUser, loginUser, getUser } = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/:id',getUser)
router.delete('/delete', protect, deleteUser)

module.exports = router