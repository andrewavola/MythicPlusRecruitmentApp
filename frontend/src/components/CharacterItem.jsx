function CharacterItem({character}) {
  return (
    <div className="goal">
      <h2>{character.name}</h2>
      <img src={character.characterPicture}alt="Character Avatar"></img>
    </div>
  )
}

export default CharacterItem