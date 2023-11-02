import { useSelector } from "react-redux";

function ConversationItem({conversation}) {
  
  const currentUserID = useSelector((state) => state.auth.user?._id)
  const isCurrentUserSender = currentUserID === conversation.senderId
  const displayName = isCurrentUserSender ? conversation.receiverName : conversation.senderName
  return (
    <div className="conversation">
      <img className="conversationImg" src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U" alt=""/>
      <span className="conversationName">{displayName}</span>
    </div>
  )
}

export default ConversationItem