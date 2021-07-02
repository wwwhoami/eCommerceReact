function validator<T extends (...args: string[]) => string>(
	func: T
): (...funcArgs: Parameters<T>) => string {
	return (...args: Parameters<T>): string => {
		const error = func(...args)
		return error
	}
}

export const validateEmail = validator(function checkEmail(email: string) {
	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (!email) {
		return 'Email is required'
	} else if (!emailRegex.test(String(email).toLowerCase())) {
		return 'Email is incorrect'
	}
	return ''
})

export const validatePassword = validator(function checkPassword(
	password: string
) {
	if (!password) {
		return 'Password is required'
	}
	return ''
})

export const validatePasswordConfirm = validator(function checkPasswordConfirm(
	password: string,
	passwordConfirm: string
) {
	if (!passwordConfirm) {
		return 'Password confirmation is required'
	} else if (password !== passwordConfirm) {
		return 'Password and password confirmation should match'
	}
	return ''
})

export const validateUsername = validator(function checkUsername(
	username: string
) {
	const usernameRegex = /^[a-zA-Z0-9]+$/

	if (!username) {
		return 'Username is required'
	} else if (!usernameRegex.test(String(username).toLowerCase())) {
		return 'Usernames can only have letters and numbers'
	}
	return ''
})
