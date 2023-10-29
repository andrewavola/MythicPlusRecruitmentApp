const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {createPost, getPosts, deletePost} = require('../controllers/postController')

router.post('/', protect, createPost)
router.get('/getPosts', protect, getPosts)
router.delete('/:id', protect, deletePost)

module.exports = router