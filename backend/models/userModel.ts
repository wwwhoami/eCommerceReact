import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { Document, model, Schema } from 'mongoose'
import redisClient from '../config/redis'
import { IUser } from '../types'
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
			const { id, username } = this
			const expiresIn = 600

			const accessToken = sign(
				{ user: { id, username } },
				process.env.ACCESS_TOKEN_SECRET as string,
				{ expiresIn }
			)
			return accessToken
		} catch (error) {
			throw new Error(error)
		}
	},
	createRefreshToken: async function () {
		try {
			let { id, username } = this
			const expiresIn = 86400

			const refreshToken = sign(
				{ user: { id, username } },
				process.env.REFRESH_TOKEN_SECRET as string,
				{ expiresIn }
			)

			redisClient.set(id, refreshToken)
			redisClient.expire(id, expiresIn)
			// await new Token({ token: refreshToken }).save()
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
