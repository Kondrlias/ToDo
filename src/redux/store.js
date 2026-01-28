import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tasksSlice from './slices/tasksSlice';
import textSlice from './slices/textSlice';
import Auth from './slices/Auth';

const tasksMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type.startsWith('tasks/')) {
    const tasks = store.getState().tasks.tasks;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  return result;
};

const tokenMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type.startsWith('isAuth/')) {
    const token = store.getState().isAuth.token;
    localStorage.setItem('token', JSON.stringify(token));
  }

  return result;
};

const store = configureStore({
  reducer: combineReducers({
    text: textSlice,
    tasks: tasksSlice,
    token: Auth,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksMiddleware, tokenMiddleware),
});

export default store;
