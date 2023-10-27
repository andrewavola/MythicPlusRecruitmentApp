import { useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import CharacterForm from "../components/CharacterForm"
import Spinner from '../components/Spinner'
import { reset, getCharacters } from "../features/characters/characterSlice"

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
    </>
  )
}

export default Dashboard