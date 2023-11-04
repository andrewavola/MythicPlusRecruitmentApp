//Making http request and sending data back / setting data in local storage

import axios from 'axios'

const API_URL = '/api/users/'

//Register the user
const register  = async(userData) => {
  const response = await axios.post(API_URL, userData)

  if(response.data){
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout the user
const logout = () => {
  localStorage.removeItem('user')
}


// Login the user
const login  = async(userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if(response.data){
    
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}
const authService = {
  register,
  logout,
  login,
  
}

export default authService