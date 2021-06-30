import asyncHandler from 'express-async-handler'
import { verify } from 'jsonwebtoken'
import User from '../models/userModel'
import { TokenInterface } from './../types'

export const protect = asyncHandler(async (req, res, next) => {
	const { authorization } = req.headers

	if (authorization?.startsWith('Bearer')) {
		try {
			const token = authorization.split(' ')[1]
			const decoded = verify(token, process.env.JWT_SECRET as string)

			req.user = (await User.findById((decoded as TokenInterface).id).select(
				'-password'
			)) as typeof req.user
		} catch (error) {
			res.status(401)
			throw new Error('Not authorized, token failed')
		}
	} else {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
	next()
})
