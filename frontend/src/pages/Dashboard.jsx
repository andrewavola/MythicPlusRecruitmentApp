import { useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import CharacterForm from "../components/CharacterForm"
function Dashboard() {

  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)


  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [user, navigate])


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