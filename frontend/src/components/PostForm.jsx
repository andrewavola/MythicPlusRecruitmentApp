import { useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { createPost } from "../features/posts/postSlice";

function PostForm(){
  const [text, setText] = useState("")
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const dispatch = useDispatch()
  const {characters} = useSelector((state) => state.character)
  const {_id, name} = useSelector((state) => state.auth.user || {}) || {}
  


  //functions for submitting and updating
  const handleCharacterChange = (event) => {
    const selectedCharacterID = event.target.value
    const selectedCharacterObject = characters.find(character => character._id === selectedCharacterID)
    setSelectedCharacter(selectedCharacterObject)
    

  }

  const handleTextchange = (event) => {
    setText(event.target.value)
  }

  

  const handleSubmit = (event) =>{
    event.preventDefault()
    console.log(name)
    const postData = {
      user: _id,
      username: name,
      characterPicture: selectedCharacter?.characterPicture,
      characterName: selectedCharacter?.name,
      mythicScore: selectedCharacter?.mythicScore,
      classType: selectedCharacter?.classType,
      text: text
    }

    //dispatch a createPost even passing in the selected character and post
    dispatch(createPost(postData))
  }

  return (
    <div>
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Character:
          <select value={selectedCharacter ? selectedCharacter._id: ''} onChange={handleCharacterChange}>
            <option value="" disabled>Select a character</option>
            {characters && characters.map(characters => (
              <option key={characters._id} value={characters._id}>
                {characters.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Write your post:
          <textarea value={text} onChange={handleTextchange} />
        </label>
        <br />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};
  

export default PostForm