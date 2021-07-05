import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AccessToken, RootState, User, UserState } from '../types'

// const userInfoFromStorage = localStorage.getItem('userInfo')

const initialState: UserState = {
	// user: userInfoFromStorage && JSON.parse(userInfoFromStorage),
}

export const refreshToken = createAsyncThunk('user/refreshToken', async () => {
	const res = await axios.get<AccessToken>(`/api/refresh-token`)

	if (res.status === 200) return res.data
})

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

export const updateUserData = createAsyncThunk(
	'user/updateUserData',
	async (userData: {
		username?: string
		email?: string
		password?: string
	}) => {
		try {
			const res = await axios.put<User>('/api/user/profile', userData)
			if (res.status === 200) return res.data
		} catch (error) {
			throw new Error(error.response.data.message)
		}
	}
)

const userReducer = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAccessToken: (state, action: PayloadAction<AccessToken>) => {
			state.userData = { ...state.userData, ...action.payload }
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(refreshToken.pending, (state) => {
				state.status = 'loading'
				state.error = undefined
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				state.status = 'finished'
				state.userData = action.payload
				state.error = undefined
			})
			.addCase(refreshToken.rejected, (state, action) => {
				state.status = 'login error'
				state.error = action.error
			})

			.addCase(userLogin.pending, (state) => {
				state.status = 'loading'
				state.error = undefined
			})
			.addCase(userLogin.fulfilled, (state, action) => {
				state.status = 'finished'
				state.userData = action.payload

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
				state.userData = action.payload
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
				state.userData = undefined
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
				state.userData = { ...state.userData, ...action.payload }
				state.error = undefined
			})
			.addCase(fetchUserData.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error
			})

			.addCase(updateUserData.pending, (state) => {
				state.status = 'loading'
				state.error = undefined
			})
			.addCase(updateUserData.fulfilled, (state, action) => {
				state.status = 'updated'
				state.userData = action.payload
				state.error = undefined
			})
			.addCase(updateUserData.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error
			})
	},
})

export const getUserData = (state: RootState) => state.user.userData

export const getStatus = (state: RootState) => state.user.status

export const getErrorMessage = (state: RootState) => state.user.error?.message

export const getAccessToken = (state: RootState) =>
	state.user.userData?.accessToken

export const accessTokenExpired = (state: RootState) =>
	!!state?.user?.userData?.accessTokenExpiry &&
	new Date().getTime() / 1000 >= state.user.userData.accessTokenExpiry

export const userIsLoggedIn = (state: RootState) => !!state?.user?.userData

export const { setAccessToken } = userReducer.actions

export default userReducer.reducer
