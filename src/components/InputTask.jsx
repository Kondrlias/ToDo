import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTextAction, createAddAction } from '../redux/actions/textAction';
import InputTitle from './shared/InputTitle';
const InputTask = () => {
  const dispatch = useDispatch();
  const { text } = useSelector((store) => store.text);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    dispatch({ type: 'change', payload: e.target.value });
  };

  const addTask = () => {
    if (text.trim()) {
      dispatch(createAddAction(text));
      dispatch(clearTextAction());
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
