const mongoose = require('mongoose')

//User Post Scheme
const messageSchema = mongoose.Schema({
    
    conversationID:{
       type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Conversations'
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