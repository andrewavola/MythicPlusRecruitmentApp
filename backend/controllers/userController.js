const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')


// @description     Registers a new user
// @route           POST /api/users
// @access          Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error ('Please add all fields')
    }

    // Check if the user already exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error ('User is already registered with that email')
    }

    // Hash the password with bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPW = await bcrypt.hash(password, salt)

    // Create the user
    const user = await User.create({
        name, 
        email,
        password: hashedPW
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    
})

// @description     Login a user
// @route           POST /api/users/login
// @access          Public
const loginUser = asyncHandler(async(req, res) => {
    const{email, password} = req.body

    // Checks for user email during login
    const user = await User.findOne({email})

    // Compare user inputed password to hashed password from DB
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
        
    } else{
        res.status(400)
        throw new Error('Invalid credentials')
    }

})

// @description     Get user data
// @route           GET /api/users/me
// @access          Private
const getUser = asyncHandler(async(req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)
    res.status(200).json({
        id: _id, 
        name, 
        email
    })

})


// @description     Delete user that exists already
// @route           DELETE /api/users/delete
// @access          Private
const deleteUser = asyncHandler(async(req, res) => {
    res.status(200).json({message: 'Delete User'})
})


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'

    })
}
module.exports = {
    registerUser,
    deleteUser, 
    loginUser,
    getUser
}