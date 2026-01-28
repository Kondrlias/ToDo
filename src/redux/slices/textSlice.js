import { createSlice } from '@reduxjs/toolkit';

const initialState = { text: '' };

const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    change(state, action) {
      state.text = action.payload;
    },
    clear(state) {
      state.text = '';
    },
  },
  selectors: {
    selectText: (state) => state.text,
  },
});

export const { change, clear } = textSlice.actions;
export const { selectText } = textSlice.selectors;
export default textSlice.reducer;
