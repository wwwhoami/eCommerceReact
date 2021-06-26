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

export type User = {
	name: string
	email: string
	password: string
	isAdmin?: boolean
}

export interface HttpException extends Error {
	status: number
	message: string
}
