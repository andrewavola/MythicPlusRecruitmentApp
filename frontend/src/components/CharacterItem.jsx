import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import {deleteCharacter} from '../features/characters/characterSlice'
import { createPost } from '../features/posts/postSlice'
import { updatePFP } from '../features/auth/authSlice'
function CharacterItem({character}) {
  const _id = useSelector((state) => state.auth.user?._id || '')
  const [isTextFieldVisible, setTextFieldVisible] = useState('')
  const [isMainButtonClicked, setisMainButtonClicked] = useState(false)
  const [postText, setPostText] = useState('')
  const dispatch = useDispatch()
  const defaultPFP = 'https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP.jpg'


  
  const handleCreatePost = () => {
    //dispatching post action
    const postData = {
      user: _id,
      username: character?.name,
      characterPicture: character?.characterPicture,
      characterName: character?.name,
      mythicScore: character?.mythicScore,
      classType: character?.classType,
      text: postText
    }
    console.log(postData)
    dispatch(createPost(postData))
    setPostText('')
    setTextFieldVisible(false)
  }

  const handlePostClick = () => {
    setTextFieldVisible(true)
    
  }

  const handleChooseMain = () => {
    dispatch(updatePFP(character.characterPicture))
    setisMainButtonClicked(true)
  }

  const handleDeleteCharacter = () =>{
    dispatch(updatePFP(defaultPFP))
    dispatch(deleteCharacter(character._id))
  }
  return (
    <div className="goal">
      <h2>{character.name}</h2>
      <h1>{character.mythicScore}</h1>
      <h1>{character.server}</h1>
      <h1>{character.race}</h1>
      <h1>{character.region}</h1>
      <h1>{character.classType}</h1>
      <img src={character.characterPicture}alt="Character Avatar"></img>
      <button onClick={handleDeleteCharacter} className="close">X</button>
      <button className="btn btn-block" onClick= {handlePostClick}>Create a Post</button>
      {isTextFieldVisible && (
        <div>
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Write your post..."
        />
        <button onClick={handleCreatePost}>Post</button>
      </div>
      
      )}
      <button className ={isMainButtonClicked? 'chosen-main' : 'not-main'}onClick={handleChooseMain}>
        {isMainButtonClicked? 'Main chosen' : 'Choose main'}
      </button>
    </div>
  )
}

export default CharacterItem