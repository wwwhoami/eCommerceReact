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

export type ProductListState = {
	status: 'loading' | 'finished' | 'error'
	products?: IProduct[]
	error?: SerializedError
}

export type ProductDetailsState = {
	status: 'loading' | 'finished' | 'error'
	product?: IProduct
	error?: SerializedError
}

export type CartState = {
	status?: 'loading' | 'finished' | 'error'
	cart: CartItem[]
	error: SerializedError
}

export type State = {
	productList: ProductListState
	productDetails: ProductDetailsState
	cart: CartState
}
