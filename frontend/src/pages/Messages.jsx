import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MessageForm from "../components/MessageForm";
import MessageItem from "../components/MessageItem";
import Spinner from "../components/Spinner";
import "../Styles/messenger.css";
import ConversationItem from "../components/ConversationItem";
import {getConversations, reset} from '../features/conversations/conversationSlice'
import {getMessages} from '../features/messages/messageSlice'
function Messages() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {conversations, isLoading, isError, message} = useSelector((state) => state.conversation)
  const {messages} = useSelector((state) => state.message)
  const {user} = useSelector((state)=> state.auth)
  const [currentChat, setCurrentChat] = useState(null)

  
  useEffect(() => {
    //In here we are going to grab all conversations that belong to the current user
    if(isError){
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }

    if(user){
      dispatch(getConversations())
    }
  }, [user, navigate, isError, message, dispatch])


  useEffect(() => {
    try {
      if(currentChat){
        dispatch(getMessages(currentChat))
      }
    } catch (error) {
      console.log(error)
    }
  },[currentChat, dispatch])

  const handleConversationClick = (conversationId) => {
    setCurrentChat(conversationId)
  }
  
  //POSTS IS GOING TO HAVE THEIR CHARACTER PICTURE, SET THAT WHEN YOU CLICK ON THE MESSAGE BUTTON


  if(isLoading){
    return <Spinner/>
  }
  return(
  <>
    <div className="messenger">
       <div className="chatMenu">
        <div className="chatMenuWrapper">Chats
          {conversations.map((conversation) => (
            <div onClick={() => handleConversationClick(conversation._id)}>
              <ConversationItem key={conversation._id} conversation={conversation} />
            </div>
          ))}
        </div>
       </div>
       <div className="chatBox">
        <div className="chatBoxWrapper">ChatBox
          <div className="chatBoxTop">
            {messages.map(m=> (
              <MessageItem message={m} own={m.sender === user.name}/>
            ))}
            
          </div>
          <div className="chatBoxBottom">
            <textarea className="chatMessageInput" placeholder="Send a message..."></textarea>
            <button className="chatSubmitButton">Send</button>
          </div>
        </div>
       </div>
    </div>
  </>
)}

export default Messages;
