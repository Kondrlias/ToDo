import { useDispatch } from 'react-redux';

export default function DoneCheacked({ id, isDone }) {
  const dispatch = useDispatch();

  const handleCheacked = (id) => {
    dispatch({ type: 'check', payload: id });
  };
  return (
    <input
      type="checkbox"
      checked={isDone}
      onChange={() => handleCheacked(id)}
    />
  );
}
