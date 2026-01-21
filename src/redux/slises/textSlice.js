import { createSlice } from '@reduxjs/toolkit';

const initialState = { text: "" };

const textSlice = createSlice({
  name: 'text',
	initialState,
  reducers: {
    change(value, action) {
      value.text = action.payload;
    },
    clear(value) {
      value.text = '';
    },
  },
});

export const { change, clear } = textSlice.actions;
export default textSlice.reducer;
