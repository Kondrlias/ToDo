import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask } from '../redux/slices/tasksSlice';
import { change, clear, selectText } from '../redux/slices/textSlice';
import InputTitle from './shared/InputTitle';

const InputTask = () => {
  const dispatch = useDispatch();
  const text = useSelector(selectText);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    dispatch(change(e.target.value));
  };

  const addTask = () => {
    if (text.trim()) {
      dispatch(addNewTask(text));
      dispatch(clear());
      setError('');
    } else {
      setError('Введите задание');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red', fontSize: '10px' }}>{error}</p>}
      <div className="flex">
        <InputTitle
          title={text}
          placeholder={'What is the task today?'}
          onChange={handleChange}
          handleKeyDown={handleKeyDown}
        />
        <button className="ml-2" onClick={addTask}>
          Add task
        </button>
      </div>
    </div>
  );
};

export default memo(InputTask);
