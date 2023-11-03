import { useSelector } from "react-redux";

function ConversationItem({conversation}) {
  
  const currentUserID = useSelector((state) => state.auth.user?._id)
  const isCurrentUserSender = currentUserID === conversation.senderId
  const displayName = isCurrentUserSender ? conversation.receiverName : conversation.senderName
  return (
    <div className="conversation">
      <img className="conversationImg" src={conversation.receiverPicture} alt=""/>
      <span className="conversationName">{displayName}</span>
    </div>
  )
}

export default ConversationItem