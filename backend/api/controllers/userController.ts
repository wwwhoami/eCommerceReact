import asyncHandler from 'express-async-handler'
import { decode, JwtPayload } from 'jsonwebtoken'
import Token from '../../models/tokenModel'
import User from '../../models/userModel'
import { IUser } from '../../types'

/**
 * @desc   Auth user & get token
 * @route  POST /api/user/login
 * @access PUBLIC
 */
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		const { _id, username, email, isAdmin } = user
		const accessToken = await user.createAccessToken()
		const accessTokenExpiry = (decode(accessToken) as JwtPayload).exp

		const refreshToken = await user.createRefreshToken()

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
		})

		res.json({
			_id,
			username,
			email,
			isAdmin,
			accessToken,
			accessTokenExpiry,
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password!')
	}
})

/**
 * @desc   Get user profile data
 * @route  GET /api/user/profile
 * @access PRIVATE
 */
export const getUserProfileData = asyncHandler(async (req, res) => {
	const user = req.user
	if (user) {
		const { _id, username, email, isAdmin } = user
		res.status(200).json({
			_id,
			username,
			email,
			isAdmin,
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password!')
	}
})

/**
 * @desc   Register a new user
 * @route  POST /api/user
 * @access PUBLIC
 */
export const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body as IUser

	const userWithEmailExists = await User.findOne({ email })
	const userWithUsernameExists = await User.findOne({ username })
	if (userWithEmailExists) {
		res.status(400)
		throw new Error('User with provided email exists')
	} else if (userWithUsernameExists) {
		res.status(400)
		throw new Error('User with provided name exists')
	}
	const user = await User.create({
		username,
		email,
		password,
	})
	if (user) {
		const { _id, username, email, isAdmin } = user
		const accessToken = await user.createAccessToken()
		const accessTokenExpiry = (decode(accessToken) as JwtPayload).exp

		const refreshToken = await user.createRefreshToken()

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
		})

		res.status(201).json({
			_id,
			username,
			email,
			isAdmin,
			accessToken,
			accessTokenExpiry,
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

/**
 * @desc   Logout a user
 * @route  DELETE /api/user/logout
 * @access PUBLIC
 */
export const logoutUser = asyncHandler(async (req, res) => {
	try {
		const { refreshToken } = req.cookies
		await Token.findOneAndDelete({ token: refreshToken })
		res.status(200).send()
	} catch (error) {
		res.status(500)
		throw new Error('Internal server error')
	}
})
