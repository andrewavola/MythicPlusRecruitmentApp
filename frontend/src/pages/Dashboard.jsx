import { useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import CharacterForm from "../components/CharacterForm"
import Spinner from '../components/Spinner'
import { getCharacters } from "../features/characters/characterSlice"
import CharacterItem from "../components/CharacterItem"
import PostItem from '../components/PostItem'
import { getPosts } from "../features/posts/postSlice"
function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, profilePicture} = useSelector((state) => state.auth)
  const { characters, isLoading, isError, message } = useSelector((state) => state.character)
  const { posts } = useSelector((state) => state.post)
  const defaultPFP = 'https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP.jpg'



  useEffect(() => {

    if(isError){
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }
    
    if(user)
      dispatch(getCharacters())
      dispatch(getPosts())
   
  }, [user, navigate, isError, message, dispatch])

  
  if(isLoading){
    return <Spinner/>
  }
  
  return (
    <>
      <section className="heading">
        <h1> Welcome {user && user.name}</h1>
        <img src={profilePicture || defaultPFP} alt="Default PFP" style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          objectFit: 'cover'
        }
        }/>
        <p>Your characters</p>
      </section>
      
      <CharacterForm/>

      <section className="content">
        {characters.length > 0 ? (
          <div className="goals">
            {characters.map((character) => (
              <CharacterItem key={character._id} character={character} />
            ))}
          </div>
        ) : (<h3>You have not added characters</h3>)}
      </section>

      <section className="heading">
        <p>Your Posts</p>
      </section>

      <section className="content">
        {posts.length > 0 ? (
          <div className="goals">
            {posts.map((post) => (
              post.user === user?._id && 
                <PostItem key={post._id} post={post} />
            ))}
          </div>
        ) : (<h3>You have not added posts to the feed</h3>)}
      </section>

    </>
  )
}

export default Dashboard