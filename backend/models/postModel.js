const mongoose = require('mongoose')

//User Post Scheme
const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    username:{
        type: String,
        required: true
    },
    characterPicture:{
        type: String,
        required: true
    },
    characterName: {
        type: String,
        required: true
    },
    mythicScore:{
        type: String,
        required: true
    },
    classType:{
        type:String,
        required: true
    },
    text: {
        type: String,
        required: true,
        maxlength: 200
    },
    
},
{
    timestamps: true
})

module.exports = mongoose.model('Posts', postSchema)