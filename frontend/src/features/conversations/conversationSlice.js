import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import conversationService from './conversationService'


const initialState = {
  conversations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Get all conversations that the user has from database
export const getConversations = createAsyncThunk('conversations/getAllConversations', async(_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await conversationService.getConversations(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})


// Create a new conversation
export const createConversation = createAsyncThunk('conversations/createConversation', async(convData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await conversationService.getConversations(convData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})


// Delete a conversation that is present on the user's list

export const deleteConversation = createAsyncThunk('conversations/deleteConversation', async (convId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await conversationService.deleteConversation(convId, token)
   
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})


export const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversations.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.conversations = action.payload
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createConversation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.conversations.push(action.payload)
      })
      .addCase(createConversation.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteConversation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteConversation.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.conversations = state.conversations.filter((conversation) => conversation._id !== action.payload.id)
      })
      .addCase(deleteConversation.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }  
})


export const {reset} = conversationSlice.actions
export default conversationSlice.reducer