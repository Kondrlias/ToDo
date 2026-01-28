import { createSlice } from '@reduxjs/toolkit'

const getToken = localStorage.getItem('token') || ''

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
		logOut(state) {
			state.token = ''
			localStorage.clear('token');
		},
		// register(state, action) {
		// 	state.token = action.payload
		// }
	}, selectors: {
		selectToken: (state) => state.token,
	}
})

export const { logIn, logOut, register } = Auth.actions
export const { selectToken } = Auth.selectors
export default Auth.reducer
