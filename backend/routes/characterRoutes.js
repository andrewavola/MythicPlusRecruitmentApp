const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {createCharacter, getCharacters, deleteCharacter} = require('../controllers/characterController')


router.post('/', protect, createCharacter)
router.get('/getCharacters', protect,  getCharacters)
router.delete('/:id', protect, deleteCharacter)


module.exports = router