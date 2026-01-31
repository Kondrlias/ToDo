import { Spin } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { fetchUsers } from '../../redux/slices/Auth';

const LogIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const resultAction = await dispatch(
        fetchUsers({
          email: data.email,
          password: data.password,
        })
      );

      if (fetchUsers.fulfilled.match(resultAction)) {
        navigate('/usertasks');
      } else {
        setServerError(resultAction.payload || 'Login failed');
      }
    } catch (error) {
      setServerError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col ">
      <h1 className="">
        Welcome to{' '}
        <span className='font-bold text-sky-500 dark:text-sky-400"'>
          ToDoList
        </span>
      </h1>

      {serverError && (
        <div style={{ background: '#f8d7da', padding: 10, marginBottom: 15 }}>
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
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
              <input {...field} placeholder="Введите Email" />
            )}
          />
          <p style={{ color: 'red' }}>{errors.email?.message}</p>
        </div>

        <div className="flex flex-col gap-2">
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
        <button className="style-button pt-10">
          Login
          {isLoading && (
            <span className="ml-3 inline-flex">
              <Spin />
            </span>
          )}
        </button>
      </form>

      <br />
      <p>
        Don't have an account? <Link to="/registration">Sign up</Link>
      </p>
    </div>
  );
};

export default LogIn;
