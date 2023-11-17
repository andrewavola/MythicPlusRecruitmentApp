import { useSelector, useDispatch } from "react-redux";
import { deleteConversation } from "../features/conversations/conversationSlice";
import { deleteAllMessages } from "../features/messages/messageSlice";
import { Row, Col, Button } from "react-bootstrap";
function ConversationItem({ conversation, otherPFP }) {
  const dispatch = useDispatch();
  const currentUserID = useSelector((state) => state.auth.user?._id);
  const isCurrentUserSender = currentUserID === conversation.senderId;
  const displayName = isCurrentUserSender
    ? conversation.receiverName
    : conversation.senderName;

  const handleDeleteConversation = () => {
    console.log(conversation._id);
    dispatch(deleteConversation(conversation._id));
    dispatch(deleteAllMessages(conversation._id));
  };
  return (
    <Row className="align-items-center w-100">
      <Col md={2} >
        <img
          src={otherPFP}
          alt=""
          className="rounded-circle"
          width={40}
          height={40}
        />
      </Col>
      <Col md={8} >
        <span>{displayName}</span>
      </Col>
      <Col md={2} className="ml-auto">
        <Button
          
          variant="secondary"
          onClick={handleDeleteConversation}
          
        >
          X
        </Button>
      </Col>
    </Row>
    
  );
}

export default ConversationItem;
