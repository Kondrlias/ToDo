import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (state, thunkAPI) => {
    try {
      const store = thunkAPI.getState();
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${store.token.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createTasks = createAsyncThunk(
  'tasks/createTasks',
  async (state, thunkAPI) => {
    try {
      const store = thunkAPI.getState();
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${store.token.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: state }),
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTasks',
  async (id, thunkAPI) => {
    try {
      const store = thunkAPI.getState();
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: 'Delete',
          headers: {
            Authorization: `Bearer ${store.token.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const checkTask = createAsyncThunk(
  'tasks/checkTasks',
  async (id, thunkAPI) => {
    try {
      const store = thunkAPI.getState();
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${store.token.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    editTask(state, action) {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    },
    deleteAll(state) {
      state.tasks = [];
    },
  },
  selectors: {
    selectTasks: (state) => state.tasks,
  },
  extraReducers: (builder) => {
    builder
    .addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    })
    .addCase(createTasks.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    })
    .addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload.id
      )})
    .addCase(checkTask.fulfilled, (state, action) => {
 state.tasks = state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        );
}).addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const { editTask, deleteAll } =
  tasksSlice.actions;
export const { selectTasks } = tasksSlice.selectors;
export default tasksSlice.reducer;
