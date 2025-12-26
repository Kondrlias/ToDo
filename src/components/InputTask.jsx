import { useState } from 'react';

const InputTask = ({ token, setTask }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
    setError('');
  };

  const addTask = async (token) => {
    if (!text.trim()) {
      setError('Введите задачу');
      return;
    }
    try {
      const response = await fetch(
        'https://todo-redev.herokuapp.com/api/todos',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: `${text}`,
          }),
        }
      );
      const data = await response.json();
      setTask((prevTasks) => [...prevTasks, data]);
      setText('');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleClick = () => {
    addTask(token);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask(token);
    }
  };

  return (
    <>
      <input
        type="text"
        value={text}
        placeholder="Введи задание"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="input"
      />
      <button onClick={handleClick}>Добавить</button>
      {error && <p style={{ color: 'red', fontSize: '10px' }}>{error}</p>}
    </>
  );
};

export default InputTask;
