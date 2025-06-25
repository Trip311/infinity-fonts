import { createSlice } from '@reduxjs/toolkit';
import { demoFonts } from '../assets/demoFonts';

const fontsSlice = createSlice({
  name: 'fonts',
  initialState: {
    items: demoFonts, 
    searchQuery: "", 
  },
  reducers: {
    setFonts(state, action) {
      state.items = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    }
  },
});

export const { setFonts, setSearchQuery } = fontsSlice.actions;
export default fontsSlice.reducer;