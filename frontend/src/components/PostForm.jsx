import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../features/posts/postSlice";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
function PostForm() {
  const [text, setText] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const dispatch = useDispatch();
  const { characters } = useSelector((state) => state.character);
  const { _id, name } = useSelector((state) => state.auth.user || {}) || {};

  //functions for submitting and updating
  const handleCharacterChange = (event) => {
    const selectedCharacterID = event.target.value;
    const selectedCharacterObject = characters.find(
      (character) => character._id === selectedCharacterID
    );
    setSelectedCharacter(selectedCharacterObject);
  };

  const handleTextchange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const postData = {
      user: _id,
      username: name,
      characterPicture: selectedCharacter?.characterPicture,
      characterName: selectedCharacter?.name,
      mythicScore: selectedCharacter?.mythicScore,
      classType: selectedCharacter?.classType,
      text: text,
    };

    //dispatch a createPost even passing in the selected character and post
    dispatch(createPost(postData));
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h2>Create a Post</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Select Character:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCharacter ? selectedCharacter._id : ""}
                  onChange={handleCharacterChange}
                >
                  <option value="" disabled>
                    Select a character
                  </option>
                  {characters &&
                    characters.map((character) => (
                      <option key={character._id} value={character._id}>
                        {character.name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Write your post:</Form.Label>
                <Form.Control
                  style={{ width: "100%", height: "100px", resize: "none" }}
                  as="textarea"
                  value={text}
                  onChange={handleTextchange}
                />
              </Form.Group>
              <Button style={{marginTop:'10px', marginBottom: '10px'}}variant="success" type="submit">
                Post
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
    
  );
}

export default PostForm;
