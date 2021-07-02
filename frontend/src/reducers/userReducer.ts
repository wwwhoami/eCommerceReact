import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { User, UserState, State } from '../types'

const userInfoFromStorage = localStorage.getItem('userInfo')

const initialState: UserState = {
	user: userInfoFromStorage && JSON.parse(userInfoFromStorage),
}

export const userLogin = createAsyncThunk(
	'user/userLogin',
	async (userData: { email: string; password: string }) => {
		const res = await axios.post<User>('/api/user/login', userData)
		if (res.status === 200) return res.data
	}
)

export const userRegister = createAsyncThunk(
	'user/userRegister',
	async (userData: { username: string; email: string; password: string }) => {
		const res = await axios.post<User>('/api/user', userData)
		if (res.status === 201) return res.data
	}
)

const userReducer = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userLogout: (state) => {
			state.user = undefined
			localStorage.removeItem('userInfo')
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(userLogin.pending, (state) => {
				state.status = 'loading'
				state.error = undefined
			})
			.addCase(userLogin.fulfilled, (state, action) => {
				state.status = 'finished'
				state.user = action.payload

				state.error = undefined
				if (state.user) {
					const { _id, name, email, isAdmin, tokenExpiresAt } = state.user
					localStorage.setItem(
						'userInfo',
						JSON.stringify({ _id, name, email, isAdmin, tokenExpiresAt })
					)
				}
			})
			.addCase(userLogin.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error
			})

			.addCase(userRegister.pending, (state) => {
				state.status = 'loading'
				state.error = undefined
			})
			.addCase(userRegister.fulfilled, (state, action) => {
				state.status = 'finished'
				state.user = action.payload
				state.error = undefined
				if (state.user) {
					const { _id, name, email, isAdmin, tokenExpiresAt } = state.user
					localStorage.setItem(
						'userInfo',
						JSON.stringify({ _id, name, email, isAdmin, tokenExpiresAt })
					)
				}
			})
			.addCase(userRegister.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error
			})
	},
})

export const getUserData = (state: State) => state.user.user
export const getStatus = (state: State) => state.user.status

export const isUserAuthenticated = (state: State) =>
	state?.user?.user?.tokenExpiresAt &&
	new Date().getTime() / 1000 < state.user.user.tokenExpiresAt

export const { userLogout } = userReducer.actions

export default userReducer.reducer
