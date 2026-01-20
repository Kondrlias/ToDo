import { useDispatch, useSelector } from 'react-redux';
import { deleteAllAction } from '../../redux/actions/tasksAction';

function NumerTasks() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((store) => store.tasks);

  return (
    <div className="m-2 flex justify-between items-center">
      <p>All tasks: {tasks.length}</p>
      <button
        onClick={() => {
          dispatch(deleteAllAction());
        }}
      >
        Delete All
      </button>
    </div>
  );
}

export default NumerTasks;
