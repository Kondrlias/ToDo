import { combineReducers, configureStore } from '@reduxjs/toolkit'
import tasksSlice from './slices/tasksSlice'
import textSlice from './slices/textSlice'

const tasksMiddleware = (store) => (next) => (action) => {
  const result = next(action)

  if (action.type.startsWith('tasks/')) {
    const tasks = store.getState().tasks.tasks
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  return result
}

const store = configureStore({
  reducer: combineReducers({
    text: textSlice,
    tasks: tasksSlice,
  }), middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksMiddleware),
}
)

export default store
