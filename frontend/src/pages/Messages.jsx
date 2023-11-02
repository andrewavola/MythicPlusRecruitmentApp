import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MessageForm from "../components/MessageForm";
import MessageItem from "../components/MessageItem";
import Spinner from "../components/Spinner";
import "../Styles/messenger.css";
import ConversationItem from "../components/ConversationItem";
import Message from '../components/Message'
import {getConversations, reset} from '../features/conversations/conversationSlice'

function Messages() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {conversations, isLoading, isError, message} = useSelector((state) => state.conversation)
  const {user} = useSelector((state)=> state.auth)
  

  
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

  

  if(isLoading){
    return <Spinner/>
  }
  return(
  <>
    <div className="messenger">
       <div className="chatMenu">
        <div className="chatMenuWrapper">Chats
          {conversations.map((conversation) => (
            <ConversationItem key={conversation._id} conversation={conversation} />
          ))}
          {/* <ConversationItem/>
          <ConversationItem/>
          <ConversationItem/>
          <ConversationItem/> */}

        </div>
       </div>
       <div className="chatBox">
        <div className="chatBoxWrapper">ChatBox
          <div className="chatBoxTop">
            <Message/>
            <Message own={true}/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
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
