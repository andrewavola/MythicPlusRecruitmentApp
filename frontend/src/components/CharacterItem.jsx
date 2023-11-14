import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCharacter } from "../features/characters/characterSlice";
import { createPost } from "../features/posts/postSlice";
import { updatePFP } from "../features/auth/authSlice";
import { Card, Row, Col, Button, FormControl } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { MdClose } from "react-icons/md";


import { BsStar, BsStarFill } from "react-icons/bs";

function CharacterItem({ character }) {
  const _id = useSelector((state) => state.auth.user?._id || "");

  const [isTextFieldVisible, setTextFieldVisible] = useState("");
  const [isMainButtonClicked, setisMainButtonClicked] = useState(false);
  const [postText, setPostText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const storedState = localStorage.getItem(`mainCharacter_${character._id}`);
    if (storedState) {
      setisMainButtonClicked(JSON.parse(storedState));
    }
  }, [character._id]);

  const handleCreatePost = () => {
    //dispatching post action
    const postData = {
      user: _id,
      username: character?.name,
      characterPicture: character?.characterPicture,
      characterName: character?.name,
      mythicScore: character?.mythicScore,
      classType: character?.classType,
      text: postText,
    };

    dispatch(createPost(postData));
    setPostText("");
    setTextFieldVisible(false);
  };

  const handlePostClick = () => {
    if (isTextFieldVisible) {
      setTextFieldVisible(false);
    } else {
      setTextFieldVisible(true);
    }
  };

  const handleChooseMain = () => {
    if (isMainButtonClicked) {
      setisMainButtonClicked(false);
      localStorage.setItem(
        `mainCharacter_${character._id}`,
        JSON.stringify(false)
      );
    } else {
      dispatch(updatePFP(character.characterPicture));
      setisMainButtonClicked(true);
      localStorage.setItem(
        `mainCharacter_${character._id}`,
        JSON.stringify(true)
      );
    }
  };

  const handleDeleteCharacter = () => {
    dispatch(deleteCharacter(character._id));
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

  const formattedClass = character.classType.toLowerCase().replace(/\s+/g, "_");
  const backgroundColor = classColors[formattedClass] || "red";

  const getColorForScore = (character) => {
    if (character.mythicScore >= 0 && character.mythicScore <= 999)
      return "rgb(1, 50, 32)";
    else if (character.mythicScore >= 1000 && character.mythicScore <= 1999)
      return "rgb(0, 0, 255)";
    else if (character.mythicScore >= 2000 && character.mythicScore <= 2999)
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
            src={character.characterPicture}
            style={{ width: "120px", height: "120px" }}
          />
          <Card.Title>{character.name}</Card.Title>
          
            <Button
              variant="link"
              className="close-button"
              onClick={() => handleDeleteCharacter(character.id)}
              style={{ width: '50%',fontSize: "1.5rem", color: "red" }}
            >
              <MdClose />
            </Button>
         
        </Col>
        <Col md={8} > 
          <Row style={{paddingLeft: '10px', paddingRight: '21px', paddingTop:'5px', paddingBottom: '5px'}} >
            <Card.Body  style={{borderRadius:'10px',border:'1px solid #000',backgroundColor: 'rgba(0,0,0,0.2)'}}className="text-left">
              <Card.Title>Class: {character.classType}</Card.Title>
              <Card.Title>Server: {character.server}</Card.Title>
              <Card.Title>Race: {character.race}</Card.Title>
              <Card.Title>Region: {character.region}</Card.Title>
              <Card.Title>
                Mythic+ Rating:{" "}
                <span style={{ color: getColorForScore(character) }}>
                  {character.mythicScore}
                </span>
              </Card.Title>
              <Button
                onClick={handlePostClick}
                style={{
                  borderColor: "black",
                  backgroundColor: "rgb(198, 155, 109)",
                  marginRight: "30px",
                }}
              >
                <BsPencilSquare style={{ color: "white" }} />
              </Button>
              <Button
                onClick={handleChooseMain}
                style={{ backgroundColor: "black" }}
              >
                {isMainButtonClicked ? (
                  <BsStarFill
                    style={{ color: "yellow", marginBottom: "2px" }}
                  />
                ) : (
                  <BsStar style={{ color: "yellow", marginBottom: "2px" }} />
                )}
              </Button>
            </Card.Body>
          </Row>
          {isTextFieldVisible && (
            <div>
              <FormControl
                as="textarea"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Write your post..."
                style={{ width: "100%", height: "100px", resize: "none" }}
              />
              <Button variant="success" onClick={handleCreatePost}>
                Post
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );
}

export default CharacterItem;
