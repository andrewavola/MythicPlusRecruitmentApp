const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {createRecPost, deleteRecPost} = require('../controllers/recruitmentPostsController')

router.post('/', createRecPost)
router.delete('/deleteRecPost', deleteRecPost)

module.exports = router