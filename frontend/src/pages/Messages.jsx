import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MessageForm from "../components/MessageForm";
import MessageItem from "../components/MessageItem";
import Spinner from "../components/Spinner";
import "../Styles/messenger.css";
import ConversationItem from "../components/ConversationItem";
import { Container, Col, Row, ListGroup } from "react-bootstrap";
import { getConversations } from "../features/conversations/conversationSlice";
import { getMessages, setMessages } from "../features/messages/messageSlice";

import io from "socket.io-client";

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
  const [otherUser, setOtherUser] = useState(null);

  const socket = useRef();

  useEffect(() => {
    document.getElementById("app-body").style.backgroundImage =
      "url('https://wow.zamimg.com/images/tools/dragonflight-talent-calc/blizzard/talentbg-monk-mistweaver.jpg')";
  }, []);

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
  }, [user]);

  useEffect(() => {
    const handleReceivedMessage = (data) => {
      const newMessage = {
        conversationID: data.conversationID,
        sender: data.sender,
        text: data.text,
      };
      // Dispatch the updated arrivalMessage to the store
      dispatch(setMessages(newMessage));
    };

    socket.current.on("getMessage", handleReceivedMessage);

    return () => {
      socket.current.off("getMessage", handleReceivedMessage);
    };
  }, [dispatch]);

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
        dispatch(getMessages(currentChat._id));
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentChat, dispatch]);

  // Handles scrolling to bottom of messages after user clicks on a conversation
  useEffect(() => {
    if (scrollReference.current) {
      scrollReference.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  useEffect(() => {
    if (conversations.length === 0) {
      setCurrentChat(null);
    }
  }, [conversations]);

  const handleConversationClick = (conversation) => {
    setOtherUserPFP(
      user._id === conversation.receiverId
        ? conversation.senderPicture
        : conversation.receiverPicture
    );
    setCurrentChat(conversation);
    setOtherUser(
      user._id === conversation.receiverId
        ? conversation.senderId
        : conversation.receiverId
    );
  };

  if (convLoading || messageLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Container
        style={{
          marginTop: "100px",
          height: "90vh",
        }}
      >
        <Row>
          <Col
            className="overflow-hidden"
            md={4}
            style={{
              height: "85vh",
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "10px",
            }}
          >
            <h3>Conversations</h3>
            <ListGroup style={{ maxHeight: "69vh", overflowY: "auto" }}>
              {conversations.map((conversation) => (
                <ListGroup.Item
                  className="d-flex  mb-3 list-group-item-action"
                  style={{
                    maxWidth: "360px",
                    margin: "0 auto",
                    cursor: "pointer",
                    borderColor: "black",
                    width: "100%",
                    backgroundColor: "rgba(0,0,0,0.4)",
                  }}
                  key={conversation._id}
                  onClick={() => handleConversationClick(conversation)}
                >
                  <ConversationItem
                    conversation={conversation}
                    otherPFP={
                      user._id === conversation.senderId
                        ? conversation.receiverPicture
                        : conversation.senderPicture
                    }
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col
            md={8}
            style={{
              height: "85vh",
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "10px",
              borderLeft: "2px solid #000",
            }}
          >
            <h3>Messages</h3>
            <Row
              style={{
                border: "1px solid #000",
                margin: "auto",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.4)",
                height: "80%",
                width: "90%",
              }}
            >
              <Col style={{height: '100%', overflowY: 'auto' }}>
                {currentChat ? (
                  messages.map((m) => (
                    <Row
                      style={{marginTop: '16px'}}
                      key={m._id}
                      ref={scrollReference}
                    >
                      <MessageItem
                        message={m}
                        own={m.sender === user.name}
                        otherPFP={otherUserPFP}
                      />
                    </Row>
                  ))
                ) : (
                  <h3>Click on a conversation</h3>
                )}
              </Col>
            </Row>
            {currentChat && (
              <Row style={{ height: "9%", justifyContent: "center" }}>
                <MessageForm
                  conversation={currentChat?._id}
                  sender={user.name}
                  receiver={otherUser}
                  socket={socket}
                />
              </Row>
            )}
          </Col>
        </Row>
      </Container>
      
    </>
  );
}

export default Messages;
