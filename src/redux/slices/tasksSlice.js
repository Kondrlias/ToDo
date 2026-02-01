import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../api';

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (_, thunkAPI) => {
    try {
      const response = await instance.get(`/todos`, {});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const createTasks = createAsyncThunk(
  'tasks/createTasks',
  async (state, thunkAPI) => {
    try {
      const response = await instance.post(`/todos`, state);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTasks',
  async (id, thunkAPI) => {
    try {
      const response = await instance.delete(`todos/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const checkTask = createAsyncThunk(
  'tasks/checkTasks',
  async (id, thunkAPI) => {
    try {
      const response = await instance.patch(`/todos/${id}/isCompleted`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTask = createAsyncThunk(
  'tasks/editTasks',
  async ({ id, title }, thunkAPI) => {
    try {
      const response = await instance.patch(`/todos/${id}`, { title });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tasks: [],
  loading: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  selectors: {
    selectTasks: (state) => state.tasks,
    selectLoading: (state) => state.loading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(createTasks.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );
      })
      .addCase(checkTask.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload[0].id);
        if (task) {
          task.isCompleted = action.payload[0].isCompleted;
        }
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload.id);
        if (task) {
          task.title = action.payload.title;
        }
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { selectTasks, selectLoading } = tasksSlice.selectors;
export default tasksSlice.reducer;
