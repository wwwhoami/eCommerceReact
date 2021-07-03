import asyncHandler from 'express-async-handler'
import { verify, sign, decode, JwtPayload } from 'jsonwebtoken'
import Token from '../../models/tokenModel'

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
		const tokenDoc = await Token.findOne({ token: refreshToken })

		if (!tokenDoc) {
			res.status(401)
			throw new Error('Token expired')
		} else {
			const payload = verify(
				tokenDoc.token,
				process.env.REFRESH_TOKEN_SECRET as string
			)

			const accessToken = sign(
				{ user: (payload as JwtPayload)['user'] },
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
