import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import InputTask from './components/InputTask';
import ShowTasks from './components/ShowTasks';
import { editTaskAction } from './redux/actions/tasksAction';

function App() {
  const { tasks } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const editTitle = (id, newTitle) => {
    dispatch(editTaskAction(id, newTitle));
  };

  return (
    <>
      <Header />
      <InputTask />
      <ShowTasks editTitle={editTitle} />
    </>
  );
}

export default App;
