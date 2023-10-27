import axios from 'axios'
const API_URL = '/api/characters/'

// Add a new character to profile
const createCharacter = async(characterData, token) => {
  
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const raiderIOResponse = await axios.get(
    `https://raider.io/api/v1/characters/profile?region=${characterData.region}&realm=${characterData.server}&name=${characterData.text}&fields=mythic_plus_scores_by_season:current`
  )
  
  const extractedData = {
    user: characterData._id,
    name: raiderIOResponse.data.name,
    mythicScore: raiderIOResponse.data.mythic_plus_scores_by_season[0].scores.all.toString(),
    characterPicture: raiderIOResponse.data.thumbnail_url,
    server: raiderIOResponse.data.realm,
    race: raiderIOResponse.data.race,
    region: raiderIOResponse.data.region,
    classType: raiderIOResponse.data.class
  }
  console.log(extractedData)
  const response = await axios.post(API_URL, extractedData, config)
  return response.data
}

// Get all of our user's characters that they have added
const getCharacters = async(token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL + 'getCharacters', config)
  return response.data
}

const characterService = {
  createCharacter,
  getCharacters

}
export default characterService