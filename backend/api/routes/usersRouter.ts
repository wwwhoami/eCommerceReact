import { registerUser } from './../controllers/usersController'
import { protect } from './../../middleware/authMiddleware'
import express from 'express'
import { authUser, getUserProfile } from '../controllers/usersController'

const usersRouter = express.Router()

usersRouter.route('/').post(registerUser)

usersRouter.route('/login').post(authUser)

usersRouter.route('/profile').post(protect, getUserProfile)

export default usersRouter
