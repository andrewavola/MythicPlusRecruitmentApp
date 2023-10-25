const mongoose = require('mongoose')

//User Post Scheme
const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    characterName: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        maxlength: 200
    },
    lookingForGroup:{
        type: Boolean,
        required: true
    },
    recruitingForGroup:{
        type: Boolean,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Posts', postSchema)