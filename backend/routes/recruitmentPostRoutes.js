const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {createRecPost, deleteRecPost} = require('../controllers/recruitmentPostsController')

router.post('/', protect, createRecPost)
router.delete('/deleteRecPost', protect,  deleteRecPost)

module.exports = router