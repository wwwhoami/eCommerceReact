import { Request, Response, NextFunction } from 'express'

export function validateEmail(req: Request, res: Response, next: NextFunction) {
	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const { email } = req.body

	if (!email) {
		res.status(400)
		throw new Error('Email is required')
	} else if (!emailRegex.test(String(email).toLowerCase())) {
		res.status(400)
		throw new Error('Email is incorrect')
	}
	next()
}

export function validatePassword(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { password } = req.body
	if (!password) {
		res.status(400)
		throw new Error('Password is required')
	}
	next()
}

export function validatePasswordConfirm(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const {
		password,
		passwordConfirm,
	}: { password: string; passwordConfirm: string } = req.body
	if (!passwordConfirm) {
		res.status(400)
		throw new Error('Password confirmation is required')
	} else if (password !== passwordConfirm) {
		res.status(400)
		throw new Error('Password and password confirmation should match')
	}
	next()
}

export function validateUsername(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const usernameRegex = /^[a-zA-Z0-9]+$/
	const { username } = req.body

	if (!username) {
		res.status(400)
		throw new Error('Username is required')
	} else if (!usernameRegex.test(String(username).toLowerCase())) {
		res.status(400)
		throw new Error('Usernames can only have: letters and numbers')
	}
	next()
}
