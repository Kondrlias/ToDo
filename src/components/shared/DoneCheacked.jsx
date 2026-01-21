import { useDispatch } from 'react-redux';
import { checkTask } from '../../redux/slises/tasksSlice';

export default function DoneCheacked({ id, isDone }) {
  const dispatch = useDispatch();

  const handleCheacked = (id) => {
    dispatch(checkTask(id));
  };
  return (
    <input
      type="checkbox"
      checked={isDone}
      onChange={() => handleCheacked(id)}
    />
  );
}
