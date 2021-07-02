import { IUser } from '../../types'
import { generateToken } from '../../utils/generateToken'
import asyncHandler from 'express-async-handler'
import User from '../../models/userModel'
import { decode, JwtPayload } from 'jsonwebtoken'

/**
 * @desc   Auth user & get token
 * @route  POST /api/users/login
 * @access PUBLIC
 */
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		const { _id, name, email, isAdmin } = user
		const token = generateToken(_id)
		const tokenExpiresAt = (decode(token) as JwtPayload).exp

		res.cookie('token', token, {
			httpOnly: true,
		})
		res.json({
			_id,
			name,
			email,
			isAdmin,
			tokenExpiresAt,
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password!')
	}
})

/**
 * @desc   Get user profile
 * @route  POST /api/users/profile
 * @access PRIVATE
 */
export const getUserProfile = asyncHandler(async (req, res) => {
	const user = req.user
	if (user) {
		const { _id, name, email, isAdmin } = user
		res.send(
			res.json({
				_id,
				name,
				email,
				isAdmin,
			})
		)
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
	const { name, email, password } = req.body as IUser

	const userExists = await User.findOne({ email })
	if (userExists) {
		res.status(400)
		throw new Error('User exists')
	}
	const user = await User.create({
		name,
		email,
		password,
	})
	if (user) {
		const { _id, name, email, isAdmin } = user
		const token = generateToken(_id)
		const tokenExpiresAt = (decode(token) as JwtPayload).exp

		res.cookie('token', token, {
			httpOnly: true,
		})

		res.status(201).json({
			_id,
			name,
			email,
			isAdmin,
			tokenExpiresAt,
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})
