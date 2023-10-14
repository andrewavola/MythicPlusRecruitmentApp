const asyncHandler = require('express-async-handler')
const RecPost = require('../models/recruitmentPostsModel')

// @description     Allows user to create a recruitment post
// @route           POST /api/recPosts
// @access          Private

const createRecPost = asyncHandler(async(req, res) => {
    
    const { user, username, text} = req.body
    if(!user || !username || !text){
        res.status(400)
        throw new Error('Missing fields')
    }

    const recPostExists = await RecPost.findOne({user, username})
    if(recPostExists){
        res.status(400)
        throw new Error('You have already posted a recruitment post!')
    }

    const recPost = await RecPost.create({
        user, 
        username,
        text
    })

    if(recPost){
        res.status(201).json({
            message: 'Recruitment post has been successfuly created!'
        })
    } else{
        res.status(400)
        throw new Error ('Invalid recruitment post data')
    }
    
})

const deleteRecPost = asyncHandler(async(req, res) => {
    const { user } = req.body
    if(!user){
        res.status(400)
        throw new Error('Missing field')
    }

    const result = await RecPost.deleteOne({ user })
    if(result.deletedCount === 1){
        res.status(200).json({
            message: 'Deleted recruitment post successfuly'
        })
    } else{
        res.status(400)
        throw new Error('Recruitment post to be deleted failed')
    }
})

module.exports = {
    createRecPost, 
    deleteRecPost
}