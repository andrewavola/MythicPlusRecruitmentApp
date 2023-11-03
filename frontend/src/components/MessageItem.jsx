import {formatDistanceToNow} from "date-fns"

function MessageItem({message, own}) {
  const formattedTime = formatDistanceToNow(new Date(message.createdAt), {addSuffix: true})
  return (
    <div className={own ? "message" : "message own"}>
      <div className="messageTop">
        <img src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U" alt="" className="messageImg" />
        <p className="messageText">{message.text}</p>
        
      </div>
      <div className="messageBottom">{formattedTime}</div>
      
    </div>
  )
}

export default MessageItem