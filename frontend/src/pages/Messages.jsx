import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MessageForm from "../components/MessageForm";
import MessageItem from "../components/MessageItem";
import Spinner from "../components/Spinner";
import "../Styles/messenger.css";
import ConversationItem from "../components/ConversationItem";
import Message from '../components/Message'

function Messages() {

  // grab everything from the conversations redux state after it's created, then use that array of conversations
  // to map onto the 'chatmenuwrapper'
  // Look to pass the user's first characters character image to the conversation img src just to have something
  // Grab the state for conversations from files conversations.slice/conversations.service after dispatching
  // some action inside of the useEffect

  useEffect(() => {
    //In here we are going to grab all conversations that belong to the current user
  })
  return(
  <>
    <div className="messenger">
       <div className="chatMenu">
        <div className="chatMenuWrapper">Menu
          <ConversationItem/>
          <ConversationItem/>
          <ConversationItem/>
          <ConversationItem/>

        </div>
       </div>
       <div className="chatBox">
        <div className="chatBoxWrapper">ChatBox
          <div className="chatBoxTop">
            <Message/>
            <Message own={true}/>
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
