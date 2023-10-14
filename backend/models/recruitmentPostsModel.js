const mongoose = require('mongoose')

// Recruitment post schema
const recPostSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    username: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
        maxlength: 300
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('RecPosts', recPostSchema)