import {useDispatch} from 'react-redux'
import {deleteCharacter} from '../features/characters/characterSlice'

function CharacterItem({character}) {

  const dispatch = useDispatch()
  return (
    <div className="goal">
      <h2>{character.name}</h2>
      <img src={character.characterPicture}alt="Character Avatar"></img>
      <button onClick={() => dispatch(deleteCharacter(character._id))} className="close">X</button>
    </div>
  )
}

export default CharacterItem