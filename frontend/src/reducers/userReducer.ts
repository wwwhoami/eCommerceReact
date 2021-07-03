import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AccessToken, State, User, UserState } from '../types'

// const userInfoFromStorage = localStorage.getItem('userInfo')

const initialState: UserState = {
	// user: userInfoFromStorage && JSON.parse(userInfoFromStorage),
}

export const userLogin = createAsyncThunk(
	'user/userLogin',
	async (userData: { email: string; password: string }) => {
		try {
			const res = await axios.post<User>('/api/user/login', userData)
			if (res.status === 200) return res.data
		} catch (error) {
			throw new Error(error.response.data.message)
		}
	}
)

export const userSignUp = createAsyncThunk(
	'user/userSignUp',
	async (userData: {
		username: string
		email: string
		password: string
		passwordConfirm: string
	}) => {
		try {
			const res = await axios.post<User>('/api/user', userData)
			if (res.status === 201) return res.data
		} catch (error) {
			throw new Error(error.response.data.message)
		}
	}
)

export const userLogout = createAsyncThunk('user/userLogout', async () => {
	const res = await axios.delete('/api/user/logout')
	if (res.status === 200) return res.data
})

export const fetchUserData = createAsyncThunk(
	'user/fetchUserData',
	async () => {
		const res = await axios.get('/api/user/profile')
		if (res.status === 200) return res.data
	}
)

const userReducer = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAccessToken: (state, action: PayloadAction<AccessToken>) => {
			state.user = { ...state.user, ...action.payload }
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
			})
			.addCase(userLogin.rejected, (state, action) => {
				state.status = 'login error'
				state.error = action.error
			})

			.addCase(userSignUp.pending, (state) => {
				state.status = 'loading'
				state.error = undefined
			})
			.addCase(userSignUp.fulfilled, (state, action) => {
				state.status = 'created'
				state.user = action.payload
				state.error = undefined
			})
			.addCase(userSignUp.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error
			})

			.addCase(userLogout.pending, (state) => {
				state.status = 'loading'
				state.error = undefined
			})
			.addCase(userLogout.fulfilled, (state) => {
				state.user = undefined
				state.status = undefined
			})
			.addCase(userLogout.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error
			})

			.addCase(fetchUserData.pending, (state) => {
				state.status = 'loading'
				state.error = undefined
			})
			.addCase(fetchUserData.fulfilled, (state, action) => {
				state.status = 'finished'
				state.user = { ...state.user, ...action.payload }
				state.error = undefined
			})
			.addCase(fetchUserData.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error
			})
	},
})

export const getUserData = (state: State) => state.user.user

export const getStatus = (state: State) => state.user.status

export const getErrorMessage = (state: State) => state.user.error?.message

export const getAccessToken = (state: State) => state.user.user?.accessToken

export const accessTokenExpired = (state: State) =>
	!!state?.user?.user?.accessTokenExpiry &&
	new Date().getTime() / 1000 >= state.user.user.accessTokenExpiry

export const userIsLoggedIn = (state: State) => !!state?.user?.user

export const { setAccessToken } = userReducer.actions

export default userReducer.reducer
