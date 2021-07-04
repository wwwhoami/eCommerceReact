import asyncHandler from 'express-async-handler'
import { decode, JwtPayload, sign, verify } from 'jsonwebtoken'
import redisClient from '../../config/redis'

/**
 * @desc   Generate refresh token
 * @route  GET /api/refresh-token
 * @access PUBLIC
 */
export const generateRefreshToken = asyncHandler(async (req, res) => {
	const { refreshToken } = req.cookies

	if (!refreshToken) {
		res.status(403)
		throw new Error('Access denied: token missing')
	} else {
		const decoded = verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET as string
		)
		const id: string = (decoded as JwtPayload)['user']['id']
		const tokenValue = redisClient.get(id)
		if (!tokenValue) {
			res.status(401)
			throw new Error('Token expired')
		} else {
			const accessToken = sign(
				{ user: (decoded as JwtPayload)['user'] },
				process.env.ACCESS_TOKEN_SECRET as string,
				{
					expiresIn: '10m',
				}
			)
			const accessTokenExpiry = (decode(accessToken) as JwtPayload).exp

			res.status(200).json({ accessToken, accessTokenExpiry })
		}
	}
})
