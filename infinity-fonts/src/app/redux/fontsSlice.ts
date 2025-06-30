import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch fonts from your backend API
export const fetchFonts = createAsyncThunk(
  'fonts/fetchFonts',
  async () => {
    const res = await fetch('/api/font'); // Adjust the URL if needed
    const data = await res.json();
    
    return data.data;
  }
);

const fontsSlice = createSlice({
  name: 'fonts',
  initialState: {
    items: [],
    searchQuery: "",
    status: 'idle', // for loading state
    error: null as string | null,
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFonts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFonts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFonts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch fonts';
      });
  }
});

export const { setSearchQuery } = fontsSlice.actions;
export default fontsSlice.reducer;