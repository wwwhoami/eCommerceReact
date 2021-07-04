import asyncHandler from 'express-async-handler'
import { JwtPayload, verify } from 'jsonwebtoken'
import User from '../models/userModel'
import { TokenInterface } from './../types'

export const checkAuth = asyncHandler(async (req, res, next) => {
	const { authorization } = req.headers

	if (authorization?.startsWith('Bearer')) {
		try {
			const token = authorization.split(' ')[1]
			const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET as string)

			req.user = await User.findById((decoded as JwtPayload)['userId'])
		} catch (error) {
			res.status(401)
			throw new Error(error.message)
		}
	} else {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
	next()
})
