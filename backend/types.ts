import { IUserDocument } from './models/userModel'

export type Product = {
	id: string
	name: string
	image: string
	description: string
	brand: string
	category: string
	price: number
	countInStock: number
	rating: number
	numReviews: number
}

export interface IUser {
	username: string
	email: string
	password: string
	isAdmin: boolean
	matchPassword: (password: string) => Promise<boolean>
	createAccessToken: () => Promise<string>
	createRefreshToken: () => Promise<string>
}

export interface TokenInterface {
	id: string
	email: string
	username: string
}

export interface HttpException extends Error {
	status: number
	message: string
}

declare global {
	namespace Express {
		interface Request {
			user: IUserDocument | null
		}
	}
}
