import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Thanks = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    if (seconds === 0) {
      navigate('/');
    }

    return () => clearInterval(countdown);
  }, [seconds, navigate]);

  return (
    <>
      <h1 className="pb-10">Спасибо за регистрацию!</h1>
      <p>Переходим на страницу входа через {seconds} секунд…</p>
      <button className="style-button" onClick={() => navigate('/')}>
        Перейти сейчас
      </button>
    </>
  );
};

export default Thanks;
