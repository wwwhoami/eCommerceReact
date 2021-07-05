import axios from 'axios'
import { setAccessToken } from './reducers/userReducer'
import store from './store'

export const getCsrfToken = async () => {
	const { data } = await axios.get('/api/csrf-token')
	axios.defaults.headers['X-CSRF-Token'] = data.csrfToken
}

export const createAxiosResponseInterceptor = () => {
	const interceptor = axios.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config

			if (error.response.status !== 401) {
				return Promise.reject(error)
			}

			/*
			 * When response code is 401, try to refresh the token.
			 * Eject the interceptor so it doesn't loop in case
			 * token refresh causes the 401 response
			 */
			axios.interceptors.response.eject(interceptor)

			if (
				error.response.status === 401 &&
				!originalRequest._retry &&
				originalRequest.url !== '/api/user/login'
			) {
				originalRequest._retry = true

				const res = await axios.get(`/api/refresh-token`)
				if (res.status === 200) {
					store.dispatch(setAccessToken(res.data))

					setAccessTokenHeader(res.data.accessToken)

					return axios(originalRequest)
				}
			}

			return createAxiosResponseInterceptor
		}
	)
}

export const setAccessTokenHeader = (accessToken: string) => {
	if (accessToken) {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
	}
}

export const removeAccessTokenHeader = () => {
	axios.defaults.headers.common['Authorization'] = null
}
