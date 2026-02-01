import { useSelector } from 'react-redux';
import { selectTasks } from '../../redux/slices/tasksSlice';

function NumerTasks() {
  const tasks = useSelector(selectTasks);

  return (
    <div className="m-2 flex justify-between items-center">
      <p>All tasks: {tasks.length}</p>
    </div>
  );
}

export default NumerTasks;
