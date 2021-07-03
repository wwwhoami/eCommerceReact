import bcrypt from 'bcryptjs'
import { Document, model, models, Schema } from 'mongoose'
import { sign } from 'jsonwebtoken'
import { IUser } from '../types'
import Token from '../models/tokenModel'

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
	{
		username: {
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

userSchema.methods = {
	matchPassword: async function (enteredPassword: string) {
		return await bcrypt.compare(enteredPassword, this.password)
	},
	createAccessToken: async function () {
		try {
			const { _id, username } = this
			const accessToken = sign(
				{ user: { _id, username } },
				process.env.ACCESS_TOKEN_SECRET as string,
				{ expiresIn: '10m' }
			)
			return accessToken
		} catch (error) {
			throw new Error(error)
		}
	},
	createRefreshToken: async function () {
		try {
			const { _id, username } = this
			const refreshToken = sign(
				{ user: { _id, username } },
				process.env.REFRESH_TOKEN_SECRET as string,
				{ expiresIn: '1d' }
			)
			// TODO: SAVE REFRESH TOKEN TO REDIS
			await new Token({ token: refreshToken }).save()
			return refreshToken
		} catch (error) {
			throw new Error(error)
		}
	},
}

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const User = model<IUserDocument>('User', userSchema)

export default User
