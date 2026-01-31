import { combineReducers, configureStore } from '@reduxjs/toolkit';
import Auth from './slices/Auth';
import tasksSlice from './slices/tasksSlice';
import textSlice from './slices/textSlice';

const store = configureStore({
  reducer: combineReducers({
    text: textSlice,
    tasks: tasksSlice,
    token: Auth,
  }),
});

export default store;
