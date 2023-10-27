const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Character = require('../models/characterModel')


// @description     Creates a character that you can post to your profile dashboard
// @route           POST /api/characters
// @access          Private
const createCharacter = asyncHandler(async (req, res) => {
    const { user, name, mythicScore, characterPicture, server, race, region, classType} = req.body
    if(!user || !name || !mythicScore || !characterPicture || !server || !race || !region || !classType){
        res.status(400)
        throw new Error ('Missing a field')
    }

    
    const characterExists = await Character.findOne({ user: user, name: name, server: server })
    if(characterExists){
        res.status(400)
        throw new Error ('Character already exists!')
    }

    const character = await Character.create({
        user, 
        name, 
        mythicScore,  
        characterPicture,
        server, 
        race, 
        region, 
        classType
    })

    
    if(character){
        res.status(201).json({
            message: 'Character successfuly added!'
        })
    } else{
        res.status(400)
        throw new Error('Invalid character data')
    }
})

// @description     Deletes a character posting
// @route           POST /api/characters/deleteCharacter
// @access          Private
const deleteCharacter = asyncHandler(async (req, res) => {
    const {user, name} = req.body
    if(!user || !name){
        res.status(400)
        throw new Error('Character does not exist')
    }

    const query = { user: user, name: name}
    const result = await Character.deleteOne(query)

    if(result.deletedCount === 1){
        res.json({ message: 'Deleted character successfuly'})
    }
    else{
        res.status(400)
        throw new Error('Character was not found')
    }
})


// @description     Grabs all characters for authorized user for page loading purposes
// @route           POST /api/characters/getMyCharacters || /api/characters/getCharacters
// @access          Private
const getCharacters = asyncHandler(async (req, res) => {
    const characters = await Character.find({user: req.user.id })
    res.status(200).json(characters)
})
module.exports = {createCharacter, getCharacters, deleteCharacter}