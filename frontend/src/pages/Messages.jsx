import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MessageForm from "../components/MessageForm";
import MessageItem from "../components/MessageItem";
import Spinner from "../components/Spinner";
import "../Styles/messenger.css";
import ConversationItem from "../components/ConversationItem";
import {
  getConversations
} from "../features/conversations/conversationSlice";
import { getMessages } from "../features/messages/messageSlice";

function Messages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    conversations,
    isLoading: convLoading,
    isError,
    message,
  } = useSelector((state) => state.conversation);
  const { isLoading: messageLoading } = useSelector((state) => state.message);
  const scrollReference = useRef();
  const { messages } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);
  const [currentChat, setCurrentChat] = useState(null);
  const [otherUserPFP, setOtherUserPFP] = useState("");


  // Get all conversations for the logged in User
  useEffect(() => {
  
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    if (user) {
      dispatch(getConversations());
    }
  }, [user, navigate, isError, message, dispatch]);


  //Get messages for whichever conversation the user clicks on
  useEffect(() => {
    try {
      if (currentChat) {
        dispatch(getMessages(currentChat));
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentChat, dispatch]);

  // Handles scrolling to bottom of messages after user clicks on a conversation
  useEffect(() => {
    if(scrollReference.current){
      scrollReference.current.scrollIntoView({behavior: "auto"})
    }
  }, [messages])

  useEffect(() => {
    if(conversations.length === 0){
      setCurrentChat(null)
    }
  }, [conversations])
  const handleConversationClick = (conversation) => {
    setOtherUserPFP(conversation.receiverPicture);
    setCurrentChat(conversation._id);
  };


  if (convLoading || messageLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            Chats
            {conversations.map((conversation) => (
              <div onClick={() => handleConversationClick(conversation)}>
                <ConversationItem
                  key={conversation._id}
                  conversation={conversation}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            ChatBox
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div key={m._id} ref={scrollReference}>
                      <MessageItem
                        message={m}
                        own={m.sender === user.name}
                        otherPFP={otherUserPFP}
                      />
                    </div>
                  ))}
                </div>

                <div className="chatBoxBottom">
                  <MessageForm conversation={currentChat} sender={user.name} />
                </div>
              </>
            ) : (
              <div className="selectConversationMessage">
                Select a conversation to view messages.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;
