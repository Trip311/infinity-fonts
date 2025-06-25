import { configureStore } from '@reduxjs/toolkit';
import fontsReducer from './fontsSlice';

export const store = configureStore({
  reducer: {
    fonts: fontsReducer,
  },
});