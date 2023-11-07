import { useSelector, useDispatch } from "react-redux";
import { deleteConversation } from "../features/conversations/conversationSlice";
import { deleteAllMessages } from "../features/messages/messageSlice";
function ConversationItem({conversation, otherPFP}) {
  
  const dispatch = useDispatch()
  const currentUserID = useSelector((state) => state.auth.user?._id)
  const isCurrentUserSender = currentUserID === conversation.senderId
  const displayName = isCurrentUserSender ? conversation.receiverName : conversation.senderName

  const handleDeleteConversation = () => {
    console.log(conversation._id)
    dispatch(deleteConversation(conversation._id))
    dispatch(deleteAllMessages(conversation._id))
  }
  return (
    <div className="conversation">
      <img className="conversationImg" src={otherPFP} alt=""/>
      <span className="conversationName">{displayName}</span>
      <button onClick={handleDeleteConversation} className="close">X</button>
    </div>
  )
}

export default ConversationItem