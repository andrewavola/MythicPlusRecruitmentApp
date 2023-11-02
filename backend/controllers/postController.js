const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')


// @description     Allows user to create a post
// @route           POST /api/posts
// @access          Private
const createPost = asyncHandler(async(req, res) => {
    const { user, username, characterPicture, characterName, mythicScore, classType, text, } = req.body
    
    //Check if we're missing a field
    if(!user || !characterName || !username || !characterPicture || !mythicScore || !classType || !text){
        res.status(400)
        throw new Error ('Missing fields')
    }

    //Check if we already made a post with this character
    const postExists = await Post.findOne({ user, characterName })
    if(postExists){
        res.status(400)
        throw new Error('Post already exists for this character')
    }

    const post = await Post.create({
        user,
        username,
        characterPicture,
        characterName,
        mythicScore,
        classType,
        text
        
    })

    res.status(201).json(post)

})


// @description     Allows user to delete a post
// @route           POST /api/posts/deletePost
// @access          Private
const deletePost = asyncHandler(async(req, res) => {
    const result = await Post.deleteOne({_id: req.params.id})

    if(result.deleteOne === 0){
        res.status(400)
        throw new Error('Post not found')
    }

    res.status(200).json({id: req.params.id})
})


// @description     Gets all posts from specific user id 
// @route           POST /api/posts/getPosts
// @access          Private
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()
    if(posts){
        res.status(200).json(posts)
    }else{
        res.status(400)
        throw new Error('Error fetching posts')
    }
})

module.exports = {
    createPost, 
    deletePost, 
    getPosts 
}