import { useState } from 'react';

const InputTask = ({ setTask }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
    setError('');
  };

  const addTask = () => {
    if (text.trim()) {
      setTask((tasks) => [
        ...tasks,
        { id: crypto.randomUUID(), title: text, isDone: false, create: Date.now() },
      ]);
      setText('');
    } else {
      setError('Не должно быть пусто');
    }
  };

  const handleClick = () => {
    addTask();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
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
