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

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // addNewTask(state, action) {
    //   state.tasks.push({
    //     id: crypto.randomUUID(),
    //     title: action.payload,
    //     isDone: false,
    //   });
    // },
    editTask(state, action) {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    },
    checkTask(state, action) {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.isDone = !task.isDone;
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    deleteAll(state) {
      state.tasks = [];
    },
  },
  selectors: {
    selectTasks: (state) => state.tasks,
    selectTasksLoading: (state) => state.tasks.isLoading,
  },
  extraReducers: (builder) => {
    (builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.error = action.payload;
      }),
      builder
        .addCase(createTasks.fulfilled, (state, action) => {
          state.tasks.push( action.payload);
        })
        .addCase(createTasks.rejected, (state, action) => {
          state.error = action.payload;
        }));
  },
});

export const { addNewTask, editTask, checkTask, deleteTask, deleteAll } =
  tasksSlice.actions;
export const { selectTasks, selectTasksLoading } = tasksSlice.selectors;
export default tasksSlice.reducer;
