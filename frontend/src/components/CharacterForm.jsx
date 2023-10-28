import { useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import {createCharacter} from '../features/characters/characterSlice'

function CharacterForm() {
  const [text, setText] = useState("");
  const [region, setRegion] = useState("");
  const [server, setServer] = useState("")

  const dispatch = useDispatch()
  const _id = useSelector((state) => state.auth.user?._id || '')
  const characterData = {text, region, server, _id}

  const onSubmitCharacter = (e) => {
    e.preventDefault();
    dispatch(createCharacter(characterData))
    setText('')
    setRegion('')
  };

  return (
    //Form for adding a character from Raider.io to their own dashboard page
    <section className="form">
      <form onSubmit={onSubmitCharacter}>
        <div className="form-group">
          <label htmlFor="text">Type character name</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Type server name</label>
          <input
            type="text"
            name="text"
            id="text"
            value={server}
            onChange={(e) => setServer(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="region">Select region</label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">Select region...</option>
            <option value="us">US</option>
            <option value="eu">EU</option>
            <option value="tw">TW</option>
            <option value="kr">KR</option>
            <option value="cn">CN</option>
          </select>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Character
          </button>
        </div>
      </form>
    </section>
  );
}

export default CharacterForm;
