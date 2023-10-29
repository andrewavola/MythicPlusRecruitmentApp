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

    
    res.status(201).json(character)
})

// @description     Deletes a character posting
// @route           POST /api/characters/deleteCharacter
// @access          Private
const deleteCharacter = asyncHandler(async (req, res) => {
    
    const result = await Character.deleteOne({_id: req.params.id})

    if(result.deletedCount === 0){
        res.status(400)
        throw new Error('Character not found')
    }


    res.status(200).json({id: req.params.id})
})


// @description     Grabs all characters for authorized user for page loading purposes
// @route           POST /api/characters/getMyCharacters || /api/characters/getCharacters
// @access          Private
const getCharacters = asyncHandler(async (req, res) => {
    const characters = await Character.find({user: req.user.id })
    res.status(200).json(characters)
})
module.exports = {createCharacter, getCharacters, deleteCharacter}