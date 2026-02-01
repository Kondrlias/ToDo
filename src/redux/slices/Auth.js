import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Login failed');
      }
      localStorage.setItem('token', data.token);
      return data.token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  token: localStorage.getItem('token'),
};

const Auth = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    logIn(state, action) {
      state.token = action.payload;
    },
    logOut(state) {
      state.token = '';
      localStorage.removeItem('token')
    },
    // register(state, action) {
    // 	state.token = action.payload
    // }
  },
  selectors: {
    selectToken: (state) => state.token,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logIn, logOut, register } = Auth.actions;
export const { selectToken } = Auth.selectors;
export default Auth.reducer;
