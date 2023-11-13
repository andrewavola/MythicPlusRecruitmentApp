import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteCharacter } from "../features/characters/characterSlice";
import { createPost } from "../features/posts/postSlice";
import { updatePFP } from "../features/auth/authSlice";
import { Card, Row, Col } from "react-bootstrap";
function CharacterItem({ character }) {
  const _id = useSelector((state) => state.auth.user?._id || "");
  const [isTextFieldVisible, setTextFieldVisible] = useState("");
  const [isMainButtonClicked, setisMainButtonClicked] = useState(false);
  const [postText, setPostText] = useState("");
  const dispatch = useDispatch();
  const defaultPFP =
    "https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP.jpg";

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
    setTextFieldVisible(true);
  };

  const handleChooseMain = () => {
    dispatch(updatePFP(character.characterPicture));
    setisMainButtonClicked(true);
  };

  const handleDeleteCharacter = () => {
    dispatch(updatePFP(defaultPFP));
    dispatch(deleteCharacter(character._id));
  };

  console.log(character.classType);
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

  const formattedClass = character.classType.toLowerCase().replace(/\s+/g, "_")
  const backgroundColor = classColors[formattedClass] || "red"

  const getColorForScore = character => {
    if(character.mythicScore >= 0 && character.mythicScore <= 999)
      return "rgb(1, 50, 32)"
    else if(character.mythicScore >= 1000 && character.mythicScore <= 1999)
      return "rgb(0, 0, 255)"
    else if(character.mythicScore >= 2000 && character.mythicScore <= 2999)
      return "rgb(186,85,211)"
    else
      return "rgb(255,146,72)"
  }

  return (
    <Card
      className="mx-auto"
      style={{ backgroundColor, margin: "10px", width: "90%" }}
    >
      <Row className="align-items-center ">
        <Col md={4} className="text-center" style={{ borderRight: '1px solid black' }}>
            <Card.Img
              variant="top"
              className="rounded-circle"
              src={character.characterPicture}
              style={{ width: "120px", height: "120px" }}
            />
            <Card.Title>{character.name}</Card.Title>
        </Col>
        <Col md={8}>
          <Row>
            <Card.Body style={{ width: "100%" }} className="text-left">
              <Card.Title>Class: {character.classType}</Card.Title>
              <Card.Title>Server: {character.server}</Card.Title>
              <Card.Title>Race: {character.race}</Card.Title>
              <Card.Title>Region: {character.region}</Card.Title>
              <Card.Title>Mythic+ Rating: <span style={{color:getColorForScore(character)}}>{character.mythicScore}</span></Card.Title>
            </Card.Body>
          </Row>
        </Col>
        
      </Row>
    </Card>

    // <div className="goal">
    //   <h2>{character.name}</h2>
    //   <h1>{character.mythicScore}</h1>
    //   <h1>{character.server}</h1>
    //   <h1>{character.race}</h1>
    //   <h1>{character.region}</h1>
    //   <h1>{character.classType}</h1>
    //   <img src={character.characterPicture}alt="Character Avatar"></img>
    //   <button onClick={handleDeleteCharacter} className="close">X</button>
    //   <button className="btn btn-block" onClick= {handlePostClick}>Create a Post</button>
    //   {isTextFieldVisible && (
    //     <div>
    //     <textarea
    //       value={postText}
    //       onChange={(e) => setPostText(e.target.value)}
    //       placeholder="Write your post..."
    //     />
    //     <button onClick={handleCreatePost}>Post</button>
    //   </div>

    //   )}
    //   <button className ={isMainButtonClicked? 'chosen-main' : 'not-main'}onClick={handleChooseMain}>
    //     {isMainButtonClicked? 'Main chosen' : 'Choose main'}
    //   </button>
    // </div>
  );
}

export default CharacterItem;
