const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {createCharacter, getCharacters, deleteCharacter} = require('../controllers/characterController')


router.post('/', protect, createCharacter)
router.get('/getMyCharacters', protect,  getCharacters)
router.get('/getCharacters', getCharacters)
router.delete('/deleteCharacter', protect, deleteCharacter)


module.exports = router