import { createSlice } from '@reduxjs/toolkit'

const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []

const initialState = {
  tasks: savedTasks,
}


const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addNewTask(state, action) {
      state.tasks.push({
        id: crypto.randomUUID(),
        title: action.payload,
        isDone: false,
      })
    },
    editTask(state, action) {
      const task = state.tasks.find((t) => t.id === action.payload.id)
      if (task) {
        task.title = action.payload.title
      }
    },
    checkTask(state, action) {
      const task = state.tasks.find((t) => t.id === action.payload)
      if (task) {
        task.isDone = !task.isDone
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
    deleteAll(state) {
      state.tasks = []
    },
  },
  selectors: {
    selectTasks: (state) => state.tasks,
  },
})

export const { addNewTask, editTask, checkTask, deleteTask, deleteAll } =
  tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
export default tasksSlice.reducer
