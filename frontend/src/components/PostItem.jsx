import { useDispatch, useSelector } from "react-redux"
import {deletePost} from '../features/posts/postSlice'
function PostItem({post}) {

  //Grab current user id
  const _id = useSelector((state) => state.auth.user?._id || '')
  const dispatch = useDispatch()
  //Check if this user owns the post
  const isCurrentUser = post.user === _id

  const handleDelete = () => {
    dispatch(deletePost(post._id))
  }
  return (
    <div className="goal">
      <img src={post.characterPicture}alt="Character Avatar"></img>
      <h2>{post.characterName}</h2>
      <h1>{post.text}</h1>
      <p>{post.mythicScore}</p>
      <p>{post.classType}</p>
      {isCurrentUser && (
        <button onClick={handleDelete}>Delete Post</button>
      )}
    </div>
  )
}

export default PostItem