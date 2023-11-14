import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../features/posts/postSlice";
import { createConversation } from "../features/conversations/conversationSlice";
import { Card, Row, Col, Button } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import {BiMessageAdd} from "react-icons/bi"
function PostItem({ post }) {
  //Grab current user id
  // const _id = useSelector((state) => state.auth.user?._id || '')
  const { _id, name } = useSelector((state) => state.auth.user || {}) || {};
  const { profilePicture } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //Check if this user owns the post
  const isCurrentUser = post.user === _id;

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  const classColors = {
    priest: "rgb(255, 255, 255)",
    mage: "rgb(63, 199, 235)",
    warrior: "rgb(198, 155, 109)",
    demon_hunter: "rgb(163, 48, 201)",
    paladin: "rgb(244, 140, 186)",
    rogue: "rgb(255, 244, 104)",
    hunter: "rgb(170, 211, 114)",
    shaman: "rgb(0, 112, 221)",
    warlock: "rgb(135, 136, 238)",
    druid: "rgb(255, 124, 10)",
    monk: "rgb(0, 255, 152)",
    death_knight: "rgb(196, 30, 58)",
    evoker: "rgb(51, 147, 127)",
  };

  const formattedClass = post.classType.toLowerCase().replace(/\s+/g, "_");
  const backgroundColor = classColors[formattedClass] || "red";

  const handleCreateConversation = () => {
    const convData = {
      senderId: _id,
      receiverId: post.user,
      senderPicture: profilePicture,
      receiverPicture: post.characterPicture,
      senderName: name,
      receiverName: post.characterName,
    };

    dispatch(createConversation(convData));
  };

  const getColorForScore = (post) => {
    if (post.mythicScore >= 0 && post.mythicScore <= 999)
      return "rgb(1, 50, 32)";
    else if (post.mythicScore >= 1000 && post.mythicScore <= 1999)
      return "rgb(0, 0, 255)";
    else if (post.mythicScore >= 2000 && post.mythicScore <= 2999)
      return "rgb(186,85,211)";
    else return "rgb(255,146,72)";
  };
  return (
    <Card
      className="mx-auto"
      style={{ backgroundColor, margin: "10px", width: "90%" }}
    >
      <Row className="align-items-center ">
        <Col
          md={4}
          className="text-center"
          style={{ borderRight: "1px solid black" }}
        >
          <Card.Img
            variant="top"
            className="rounded-circle"
            src={post.characterPicture}
            style={{ width: "120px", height: "120px" }}
          />
          <Card.Title>{post.characterName}</Card.Title>
          <Card.Text>Class: {post.classType}</Card.Text>
          <Card.Text>
            Mythic Score:{" "}
            <span style={{ color: getColorForScore(post) }}>
              {post.mythicScore}
            </span>
          </Card.Text>
        </Col>
        <Col md={8} className="text-center">
          <Row style={{ flex: 1, width: '100%', paddingLeft: '13px'}}>
            <Card.Body style={{borderRadius: '10px', border: '1px solid #000',backgroundColor: 'rgba(0,0,0,0.1)', height: "100%", width: "100%" }}>
              {post.text}
            </Card.Body>
          </Row>
          
            {isCurrentUser && (
              <Button
              variant="link"
              className="close-button"
              onClick={() => handleDelete(post._id)}
              style={{marginTop: '50px',width: '30%',fontSize: "1.5rem", color: "black" }}
            >
              <MdClose />
            </Button>
            )}
            {!isCurrentUser && (
              <Button style={{marginTop: '50px',  marginBottom: '10px', borderColor: 'black',backgroundColor: 'black'}}onClick={handleCreateConversation}>
                <BiMessageAdd/>
              </Button>
            )}
          
        </Col>
      </Row>
    </Card>
    // <div className="goal">
    //   <img src={post.characterPicture}alt="Character Avatar"></img>
    //   <h2>{post.characterName}</h2>
    //   <h1>{post.text}</h1>
    //   <p>{post.mythicScore}</p>
    //   <p>{post.classType}</p>
    //   {isCurrentUser && (
    //     <button onClick={handleDelete}>Delete Post</button>
    //   )}

    //   {!isCurrentUser && (
    //     <button onClick={handleCreateConversation}>message button placeholder</button>
    //   )}
    // </div>
  );
}

export default PostItem;
