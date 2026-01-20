import { combineReducers, legacy_createStore } from 'redux';
import inputTextReducer from './reducers/inputTextReducer';
import tasksReducer from './reducers/tasksReducer';

const store = legacy_createStore(
  combineReducers({
    text: inputTextReducer,
    tasks: tasksReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
