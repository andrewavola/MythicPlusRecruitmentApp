const mongoose = require('mongoose')

//User Post Scheme
const conversationSchema = mongoose.Schema({
    
    members:{
      type: Array,
      required: true
    }
    
},
{
    timestamps: true
})

module.exports = mongoose.model('Conversations', conversationSchema)