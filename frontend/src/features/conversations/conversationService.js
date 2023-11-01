import axios from 'axios'
const API_URL = '/api/conversations/'

const getConversations = async(token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  } 
  const response = await axios.get(API_URL + 'getConversations', config)
  return response.data
}

const createConversation = async(convData, token) =>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  } 

  //convData = {senderId, receiverId}
  const response = await axios.post(API_URL, convData, config)
  return response.data
}


const deleteConversation = async(convId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  } 
  const response = await axios.delete(API_URL + convId, config)
  return response.data
}



const conversationService = {
  getConversations,
  createConversation,
  deleteConversation
}

export default conversationService