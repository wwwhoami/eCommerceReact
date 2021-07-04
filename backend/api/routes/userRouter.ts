import { updateUserProfileData } from './../controllers/userController'
import { checkAuth } from '../../middleware/authMiddleware'
import express from 'express'
import {
	authUser,
	getUserProfileData,
	logoutUser,
	registerUser,
} from '../controllers/userController'
import {
	validateEmail,
	validatePassword,
	validatePasswordConfirm,
	validateUsername,
} from '../../middleware/validateMiddleware'

const userRouter = express.Router()

userRouter
	.route('/')
	.post(
		validateUsername,
		validateEmail,
		validatePassword,
		validatePasswordConfirm,
		registerUser
	)

userRouter.route('/login').post(validateEmail, validatePassword, authUser)

userRouter.route('/logout').delete(logoutUser)

userRouter
	.route('/profile')
	.get(checkAuth, getUserProfileData)
	.put(checkAuth, updateUserProfileData)

export default userRouter
