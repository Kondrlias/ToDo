import { useDispatch, useSelector } from 'react-redux';
import { deleteAll, selectTasks } from '../../redux/slices/tasksSlice';

function NumerTasks() {
  const dispatch = useDispatch();
  const  tasks  = useSelector(selectTasks);

  return (
    <div className="m-2 flex justify-between items-center">
      <p>All tasks: {tasks.length}</p>
      <button
        onClick={() => {
          dispatch(deleteAll());
        }}
      >
        Delete All
      </button>
    </div>
  );
}

export default NumerTasks;
