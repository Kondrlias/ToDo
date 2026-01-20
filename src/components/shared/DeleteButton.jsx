import { useDispatch } from 'react-redux';
import { deleteTaskAction } from '../../redux/actions/tasksAction';

export function DeleteButton({ id }) {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTaskAction(id));
  };

  return (
    <>
      <button onClick={handleDeleteTask}>
        {' '}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="#757575"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
