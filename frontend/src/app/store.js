import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import characterReducer from '../features/characters/characterSlice'
import postReducer from '../features/posts/postSlice'
export const store = configureStore({
  reducer: {
   auth: authReducer,
   character: characterReducer,
   post: postReducer
  },
});
