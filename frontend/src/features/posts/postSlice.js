import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import postService from './postService'
import { toast } from "react-toastify";


// This slice will be responsible for rendering all current user posts to the dashboard
const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}


// Get all posts from database
export const getPosts = createAsyncThunk('post/getAllPosts', async(_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await postService.getPosts(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

export const createPost = createAsyncThunk('post/createPost', async(postData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await postService.createPost(postData,token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

export const deletePost = createAsyncThunk('post/deletePost', async(postID, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await postService.deletePost(postID, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
  
})

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
    .addCase(getPosts.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getPosts.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.posts = action.payload
    })
    .addCase(getPosts.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(createPost.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createPost.fulfilled, (state, action) => {
      toast.success("Post created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      state.isLoading = false
      state.isSuccess = true
      state.posts.push(action.payload)
    })
    .addCase(createPost.rejected, (state, action) => {
      
      state.isSuccess = false
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      toast.error(state.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    })
    .addCase(deletePost.pending, (state) => {
      state.isLoading = true
    })
    .addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false
      state.posts = state.posts.filter((post) => post._id !== action.payload.id)
    })
    .addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
  }
    
})

export const {reset} = postSlice.actions
export default postSlice.reducer

