const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')

const createPost = asyncHandler(async(req, res) => {
    const { user, characterName, text } = req.body

    //Check if we're missing a field
    if(!user || !characterName || !text){
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
        characterName,
        text
    })

    if(post){
        res.status(201).json({
            message: 'Post successfuly created!'
        })
    } else{
        res.status(400)
        throw new Error('Invalid post data')
    }

})

const deletePost = asyncHandler(async(req, res) => {
    const { user, characterName } = req.body
    if(!user || !characterName){
        res.status(400)
        throw new Error('Could not find character to delete')
    }

    const query = { user: user, characterName: characterName}
    const result = await Post.deleteOne(query)

    if(result.deletedCount === 1){
        res.json({ message: 'Deleted post successfuly'})
    } else{
        res.status(400)
        throw new Error('Post to be deleted failed')
    }
})


const getPosts = asyncHandler(async (req, res) => {
    const { user } = req.body
    if(!user){
        res.status(400)
        throw new Error('User does not have any posts')
    }

    const result = await Post.find({user: user})
    if(result){
        res.status(200)
        res.json(result)
    } else{
        req.status(400)
        throw new Error('Error finding user posts')
    }
})

module.exports = {
    createPost, 
    deletePost, 
    getPosts 
}