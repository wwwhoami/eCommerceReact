import { registerUser } from '../controllers/userController'
import { protect } from '../../middleware/authMiddleware'
import express from 'express'
import { authUser, getUserProfile } from '../controllers/userController'
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

userRouter.route('/profile').post(protect, getUserProfile)

export default userRouter
