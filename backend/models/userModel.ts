import mongoose from 'mongoose'
import { User } from '../types'

export type UserDocument = mongoose.Document & User

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
)

const User = mongoose.model<UserDocument>('User', userSchema)

export default User
