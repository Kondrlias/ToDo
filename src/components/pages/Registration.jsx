import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

const BASE_API = import.meta.env.VITE_API_BASE_URL
const USERS = import.meta.env.VITE_API_USERS


const Registration = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()
	const nav = useNavigate()
	const [showPassword, setShowPassword] = useState(false)
	const [success, setSuccess] = useState(false)
	const [serverError, setServerError] = useState('')

	const registration = async (username, email, password, gender, age) => {
		try {
			const response = await fetch(`${BASE_API}${USERS}/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, email, password, gender, age }),
			})

			const data = await response.json()
			console.log('data: ', data)

			if (data && data.id) {
				setSuccess(true)
				setServerError('')
				reset({
					username: '',
					email: '',
					password: '',
					gender: 'female',
					age: '',
				})
			} else {
				setSuccess(false)
				setServerError(data.message)
			}
		} catch (error) {
			console.log('error: ', error)
			setServerError('Произошла ошибка при регистрации')
		}
	}

	const onSubmit = async (data) => {
		await registration(
			data.username,
			data.email,
			data.password,
			data.gender,
			data.age
		)
		nav('/thanks')
	}

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
							<input {...field} placeholder="Введите Email" className="w-full" />
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

				<div className='flex items-center gap-10'>
					<label>Пол</label>
					<Controller
						name="gender"
						control={control}
						defaultValue="female"
						render={({ field }) => (
							<select {...field} >
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
							<input {...field} type="number" placeholder="Введите возраст" className="w-full" />
						)}
					/>
					<p style={{ color: 'red' }}>{errors.age?.message}</p>
				</div>
				<button type="primary" htmlType="submit">
					Зарегистрироваться
				</button>
			</form>
		</>
	)
}

export default Registration