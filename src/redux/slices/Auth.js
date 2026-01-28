import { createSlice } from '@reduxjs/toolkit'

const getToken = JSON.parse(localStorage.getItem('token')) || ''

const initialState = {
	token: getToken,
}

const Auth = createSlice({
	name: 'isAuth',
	initialState,
	reducers: {
		logIn(state, action) {
			state.token = action.payload
		},
		LogOut(state) {
			state.token = ''
		},
		// register(state, action) {
		// 	state.token = action.payload
		// }
	}, selectors: {
		selectToken: (state) => state.token,
	}
})

export const { logIn, LogOut, register } = Auth.actions
export const { selectToken } = Auth.selectors
export default Auth.reducer
