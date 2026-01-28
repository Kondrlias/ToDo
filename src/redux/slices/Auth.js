import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	token: ''
}

const Auth = createSlice({
	name: 'isAuth',
	initialState,
	reducers: {
		login(state) { },
		LogOut(state) { },
		register(state) { }

	}
}
)

export const { logIn, LogOut, register } = Auth.actions
export default Auth.reducer