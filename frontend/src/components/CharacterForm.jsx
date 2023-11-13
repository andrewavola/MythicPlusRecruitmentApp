import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCharacter } from "../features/characters/characterSlice";
import {
  Form,
  Button,
  Row,
  Col,
  FloatingLabel,
  Container,
} from "react-bootstrap";
function CharacterForm() {
  const [text, setText] = useState("");
  const [region, setRegion] = useState("");
  const [server, setServer] = useState("");

  const dispatch = useDispatch();
  const _id = useSelector((state) => state.auth.user?._id || "");
  const characterData = { text, region, server, _id };

  const onSubmitCharacter = (e) => {
    e.preventDefault();
    dispatch(createCharacter(characterData));
    setText("");
    setRegion("");
  };

  return (
    //Form for adding a character from Raider.io to their own dashboard page
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form onSubmit={onSubmitCharacter}>
              <Row className="mb-3">
                <Form.Group>
                  <FloatingLabel controlId="text" label="Enter character name">
                    <Form.Control
                      type="text"
                      name="text"
                      placeholder=""
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group>
                  <FloatingLabel controlId="server" label="Enter server name">
                    {/* <Form.Label htmlFor="server">Type server name</Form.Label> */}
                    <Form.Control
                      type="text"
                      name="server"
                      placeholder=""
                      value={server}
                      onChange={(e) => setServer(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group>
                  <Form.Select
                    className="mx-auto"
                    style={{ width: "50%" }}
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value="">Select region...</option>
                    <option value="us">US</option>
                    <option value="eu">EU</option>
                    <option value="tw">TW</option>
                    <option value="kr">KR</option>
                    <option value="cn">CN</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group>
                  <Button variant="secondary" type="submit">
                    Add Character
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
    // <section className="form">
    //   <form onSubmit={onSubmitCharacter}>
    //     <div className="form-group">
    //       <label htmlFor="text">Type character name</label>
    //       <input
    //         type="text"
    //         name="text"
    //         id="text"
    //         value={text}
    //         onChange={(e) => setText(e.target.value)}
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="text">Type server name</label>
    //       <input
    //         type="text"
    //         name="text"
    //         id="text"
    //         value={server}
    //         onChange={(e) => setServer(e.target.value)}
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="region">Select region</label>
    //       <select
    //         id="region"
    //         value={region}
    //         onChange={(e) => setRegion(e.target.value)}
    //       >
    //         <option value="">Select region...</option>
    //         <option value="us">US</option>
    //         <option value="eu">EU</option>
    //         <option value="tw">TW</option>
    //         <option value="kr">KR</option>
    //         <option value="cn">CN</option>
    //       </select>
    //     </div>
    //     <div className="form-group">
    //       <button className="btn btn-block" type="submit">
    //         Add Character
    //       </button>
    //     </div>
    //   </form>
    // </section>
  );
}

export default CharacterForm;
