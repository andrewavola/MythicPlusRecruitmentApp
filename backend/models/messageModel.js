const mongoose = require('mongoose')

//User Post Scheme
const messageSchema = mongoose.Schema({
    
    conversationID:{
      type: String,
      required: true
    },
    sender: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
    
},
{
    timestamps: true
})

module.exports = mongoose.model('Messages', messageSchema)