import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import messageService from './messageService'

const initialState = {
  messages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//Get all messages from a conversation
export const getMessages = createAsyncThunk('messages/getAllMessages', async(convId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await messageService.getMessages(convId, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

export const createMessage = createAsyncThunk('messages/createMessage', async(messageData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await messageService.createMessage(messageData, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
      || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

export const deleteAllMessages = createAsyncThunk('messages/deleteAllMessages', async(convId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await messageService.deleteAllMessages(convId, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})



export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    reset: (state) => initialState,
    setMessages: (state, action) => {
      state.messages.push(action.payload)
    }
  },
   extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.messages = action.payload
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // .addCase(createMessage.pending, (state) => {
      //   state.isLoading = true
      // })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.messages.push(action.payload)
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // .addCase(deleteAllMessages.pending, (state) => {
      //   state.isLoading = true
      // })
      .addCase(deleteAllMessages.fulfilled, (state) => {
        state.isSuccess = true
        state.isLoading = false
        state.messages = []
      })
      .addCase(deleteAllMessages.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
    }
  })


export const {reset, setMessages} = messageSlice.actions
export default messageSlice.reducer