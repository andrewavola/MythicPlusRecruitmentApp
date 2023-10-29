
function PostItem({post}) {
  return (
    <div className="goal">
      <img src={post.characterPicture}alt="Character Avatar"></img>
      <h2>{post.characterName}</h2>
      <h1>{post.text}</h1>
      <p>{post.mythicScore}</p>
      <p>{post.classType}</p>
    </div>
  )
}

export default PostItem