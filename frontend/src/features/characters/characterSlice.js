import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import characterService from './characterService'
const initialState = {
  characters: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Add a character to user profile, this is protected with jwt

export const createCharacter = createAsyncThunk('character/create', async (characterData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await characterService.createCharacter(characterData, token)
   
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})


// Get our user's characters when page loads
export const getCharacters = createAsyncThunk('character/getAllCharacters', async(_,thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await characterService.getCharacters(token)
  }
   catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

export const deleteCharacter = createAsyncThunk('character/deleteCharacter', async (characterID, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await characterService.deleteCharacter(characterID, token)
   
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCharacter.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCharacter.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.characters.push(action.payload)
      })
      .addCase(createCharacter.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCharacters.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.characters = action.payload
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCharacter.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCharacter.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.characters = state.characters.filter((character) => character._id !== action.payload.id)
      })
      .addCase(deleteCharacter.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
    
})

export const {reset} = characterSlice.actions
export default characterSlice.reducer