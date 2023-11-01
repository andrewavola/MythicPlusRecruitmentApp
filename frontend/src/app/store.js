import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import characterReducer from '../features/characters/characterSlice'
import postReducer from '../features/posts/postSlice'
import conversationReducer from '../features/conversations/conversationSlice'
import messageReducer from '../features/messages/messageSlice'

export const store = configureStore({
  reducer: {
   auth: authReducer,
   character: characterReducer,
   post: postReducer,
   conversation: conversationReducer,
   message: messageReducer,
  },
});
