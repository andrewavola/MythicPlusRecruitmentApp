import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import characterReducer from '../features/characters/characterSlice'
export const store = configureStore({
  reducer: {
   auth: authReducer,
   character: characterReducer
  },
});
