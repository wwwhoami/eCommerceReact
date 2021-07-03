import { SerializedError } from '@reduxjs/toolkit'

export interface IProduct {
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

export type CartItem = IProduct & {
	quantity: number
}

export type CartItemQty = {
	_id: string
	quantity: number
}

export type AccessToken = { accessToken: string; accessTokenExpiry: number }

export type User = {
	_id?: string
	username?: string
	email?: string
	isAdmin?: Boolean
} & AccessToken

type StateTemplate = {
	status?: 'loading' | 'finished' | 'error'
	error?: SerializedError
}

export type ProductListState = StateTemplate & {
	products?: IProduct[]
}

export type ProductDetailsState = StateTemplate & {
	product?: IProduct
}

export type UserState = Omit<StateTemplate, 'status'> & {
	status?: 'loading' | 'finished' | 'error' | 'created' | 'login error'
	user?: User
}

export type CartState = StateTemplate & {
	items?: CartItem[]
	// error: SerializedError
}

export type State = {
	productList: ProductListState
	productDetails: ProductDetailsState
	cart: CartState
	user: UserState
}
