import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../api';

export const fetchUsers = createAsyncThunk(
  'auth/fetchUsers',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await instance.post(`/auth/login`, {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password, gender, age }, thunkAPI) => {
    try {
      const response = await instance.post(`/users/register`, {
        username,
        email,
        password,
        gender,
        age,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Register failed'
      );
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
      localStorage.removeItem('token');
    },
  },
  selectors: {
    selectToken: (state) => state.token,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload || action.error?.message;
        }
      );
  },
});

export const { logIn, logOut } = Auth.actions;
export const { selectToken } = Auth.selectors;
export default Auth.reducer;
