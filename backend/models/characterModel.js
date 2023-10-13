const mongoose = require('mongoose')

// Character schema
const characterSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true 
    },
    mythicScore: {
        type: String,
        required: true
    },
    itemLevel: {
        type: String,
        required: true
    },
    server: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    classType: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Characters', characterSchema)