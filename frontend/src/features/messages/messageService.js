import axios from "axios";
const API_URL = '/api/messages/'


const getMessages = async(convId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + convId, config)
  return response.data
}

const createMessage = async(messageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, messageData, config)
  return response.data
}

const deleteAllMessages = async(convId, token)=> {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + convId, config)
  return response.data
}
const messageService = {
  getMessages,
  createMessage,
  deleteAllMessages
}

export default messageService