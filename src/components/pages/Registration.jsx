import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { registerUser } from '../../redux/slices/Auth';

const Registration = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const resultAction = await dispatch(
        registerUser({
          username: data.username,
          email: data.email,
          password: data.password,
          gender: data.gender,
          age: data.age,
        })
      );

      if (registerUser.fulfilled.match(resultAction)) {
        setSuccess(true);
        nav('/thanks');
      } else {
        setSuccess(false);
        setServerError(resultAction.payload || 'Registration failed');
      }
    } catch (error) {
      setServerError('Произошла ошибка при регистрации');
    }
  };
  return (
    <>
      <h1 className="pb-10">Создать аккаунт</h1>
      {success ? (
        <div
          style={{
            background: '#d4edda',
            padding: '10px',
            marginBottom: '15px',
            color: '#155724',
          }}
        >
          Вы зарегистрированы! Перейдите чтобы войти <Link to={'/'}>Вход</Link>
        </div>
      ) : serverError ? (
        <div
          style={{
            background: '#f8d7da',
            padding: '10px',
            marginBottom: '15px',
            color: '#721c24',
          }}
        >
          {serverError}
        </div>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Имя</label>
          <Controller
            name="username"
            control={control}
            rules={{
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: /^[A-Za-zА-Яа-яЁё\s-]+$/,
                message: 'Имя может содержать только буквы, пробелы и дефисы',
              },
            }}
            render={({ field }) => (
              <input {...field} placeholder="Введите имя" className="w-full" />
            )}
          />
          <p style={{ color: 'red' }}>{errors.username?.message}</p>
        </div>

        <div>
          <label>Email</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                message: 'Введите корректный email',
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Введите Email"
                className="w-full"
              />
            )}
          />
          <p style={{ color: 'red' }}>{errors.email?.message}</p>
        </div>

        <div>
          <label>Пароль</label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Поле обязательно для заполнения',
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
                message:
                  'Пароль должен быть длиной не менее 8 символов, из них минимум 1 заглавная буква, 1 прописная, 1 число и 1 символ',
              },
            }}
            render={({ field }) => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Введите пароль"
                  className="w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ marginLeft: 8 }}
                >
                  {showPassword ? '🙈' : '🙊'}
                </button>
              </div>
            )}
          />
          <p style={{ color: 'red' }}>{errors.password?.message}</p>
        </div>

        <div className="flex items-center gap-10">
          <label>Пол</label>
          <Controller
            name="gender"
            control={control}
            defaultValue="female"
            render={({ field }) => (
              <select {...field}>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            )}
          />
        </div>

        <div>
          <label>Возраст </label>
          <Controller
            name="age"
            control={control}
            rules={{
              required: 'Введите возраст',
            }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="Введите возраст"
                className="w-full"
              />
            )}
          />
          <p style={{ color: 'red' }}>{errors.age?.message}</p>
        </div>
        <button type="primary" htmlType="submit">
          Зарегистрироваться
        </button>
      </form>
    </>
  );
};

export default Registration;
