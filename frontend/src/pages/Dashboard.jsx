import { useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import CharacterForm from "../components/CharacterForm"
import Spinner from '../components/Spinner'
import { reset, getCharacters } from "../features/characters/characterSlice"
import CharacterItem from "../components/CharacterItem"
function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { characters, isLoading, isError, message } = useSelector((state) => state.character)


  useEffect(() => {

    if(isError){
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }
    
    if(user)
      dispatch(getCharacters())
    
   
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])


  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
      <section className="heading">
        <h1> Welcome {user && user.name}</h1>
        <p>Your characters</p>
      </section>
      
      <CharacterForm/>

      <section className="content">
        <section className="content">
          {characters.length > 0 ? (
            <div className="goals">
              {characters.map((character) => (
                <CharacterItem key={character._id} character={character} />
              ))}
            </div>
          ) : (<h3>You have not added characters</h3>)}
        </section>
      </section>
    </>
  )
}

export default Dashboard