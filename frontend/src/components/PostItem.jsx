
function PostItem({post}) {
  return (
    <div className="goal">
      <h2>{post.characterName}</h2>
      <h1>{post.text}</h1>
    </div>
  )
}

export default PostItem