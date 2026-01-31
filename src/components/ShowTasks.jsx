import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks, selectTasks, selectTasksLoading } from '../redux/slices/tasksSlice'
import TaskItem from './TaskItem'
import NumerTasks from './shared/NumerTasks'

const ShowTasks = () => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch('');

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  if (!tasks.length) return <h2>Wait your tasks...</h2>;

  return (
    <>
      <NumerTasks />
      <div className="task-list">
        {tasks.map((item) => {
          return <TaskItem key={item.id} task={item} />;
        })}
      </div>
    </>
  );
};

export default ShowTasks;
