const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Character = require('../models/characterModel')

const createCharacter = asyncHandler(async (req, res) => {
    const { user, name, mythicScore, itemLevel, server, race, region, classType} = req.body
    if(!user || !name || !mythicScore || !itemLevel || !server || !race || !region || !classType){
        res.status(400)
        throw new Error ('Please add all fields')
    }

    const characterExists = await Character.findOne({ name })
    if(characterExists){
        res.status(400)
        throw new Error ('Character already exists!')
    }

    const character = await Character.create({
        user, 
        name, 
        mythicScore, 
        itemLevel, 
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
        throw new Error('Character was not found')
    }
})

const getCharacters = asyncHandler(async (req, res) => {
    const {user} = req.body
    if(!user){
        res.status(400)
        throw new Error('Character does not exist')
    }

    try {
        const characters = await Character.find({user: user})
        res.json(characters)
    } catch (error) {
        throw new Error('Could not find your characters')
    }
})
module.exports = {createCharacter, getCharacters, deleteCharacter}