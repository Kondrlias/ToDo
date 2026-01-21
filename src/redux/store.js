import { combineReducers, configureStore } from '@reduxjs/toolkit'
import tasksSlice from './slises/tasksSlice'
import textSlice from './slises/textSlice'

const store = configureStore({
  reducer: combineReducers({
    text: textSlice,
    tasks: tasksSlice,
  }),
})

export default store
