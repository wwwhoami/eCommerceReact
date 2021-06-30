export type Product = {
	_id: string
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
	name: string
	email: string
	password: string
	isAdmin: boolean
	matchPassword: (password: string) => Promise<boolean>
}

export interface TokenInterface {
	id: string
	email: string
	name: string
}

export interface HttpException extends Error {
	status: number
	message: string
}

declare global {
	namespace Express {
		interface Request {
			user: (IUser & { _id: string }) | null
		}
	}
}
