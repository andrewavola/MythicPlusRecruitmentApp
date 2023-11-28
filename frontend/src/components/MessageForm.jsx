import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../features/messages/messageSlice";
import {Row, Col, Form, Button} from 'react-bootstrap'
import "react-toastify/dist/ReactToastify.css";

function MessageForm({ conversation, sender, receiver, socket }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  // const { _id } = useSelector((state) => state.auth.user);

  const handleKeyDown = (e) => {
    if(e && e.key === 'Enter' && !e.shiftKey){
      e.preventDefault()
      sendMessage()
    }
  }
  const sendMessage = () => {
    
    
    const convData = {
      conversationID: conversation,
      sender: sender,
      text: message,
    };
    socket.current.emit("sendMessage", {
      conversationID: conversation,
      sender: sender,
      receiverId: receiver,
      text: message,
    });

    dispatch(createMessage(convData));
    setMessage("");
  };

  const isSendButtonDisabled = message.trim() === "";
  return (
    <Form  onSubmit={(e) => e.preventDefault()} style={{ height: "20%", width: "90%" }}>
      <Row>
        <Col md={10} style={{ paddingRight: "0px" }}>
          <Form.Group controlId="messageTextArea">
            <Form.Control
              style={{ resize: "none" }}
              value={message}
              as="textarea"
              rows={2}
              placeholder="Type your message..."
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Form.Group>
        </Col>
        <Col md={2} className="d-flex">
          <Row>
            <Button variant="secondary" type="submit" disabled={isSendButtonDisabled} onClick={sendMessage}>
              Send
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
    
  );
}

export default MessageForm;
