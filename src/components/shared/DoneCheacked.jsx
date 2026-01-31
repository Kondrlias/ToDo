import { useDispatch, useSelector } from 'react-redux';
import { checkTask, selectTasks } from '../../redux/slices/tasksSlice';

export default function DoneCheacked({ id }) {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const task = tasks.find((t) => t.id === id);

  const handleCheacked = (id) => {
    dispatch(checkTask(id));
  };
  return (
    <input
      type="checkbox"
      checked={task.isCompleted}
      onChange={() => handleCheacked(id)}
    />
  );
}
