import { SerializedError } from '@reduxjs/toolkit'
import store from './store'

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
	id: string
	quantity: number
}

export type ShippingAddress = {
	email: string
	country: string
	state: string
	streetAddress: string
	city: string
	postalCode: string
}

export type PaymentMethod =  'PayPal' | 'Stripe'


export type AccessToken = { accessToken: string; accessTokenExpiry: number }

export type User = {
	id?: string
	username?: string
	email?: string
	isAdmin?: Boolean
} & AccessToken

type StateTemplate = {
	status?: 'pending' | 'finished' | 'error'
	error?: SerializedError
}

export type ProductListState = StateTemplate & {
	products?: IProduct[]
}

export type ProductDetailsState = StateTemplate & {
	product?: IProduct
}

export type UserState = Omit<StateTemplate, 'status'> & {
	status?:
		| 'pending'
		| 'finished'
		| 'error'
		| 'created'
		| 'login error'
		| 'updated'
	userData?: User
}

export type UserStatus = UserState['status']

export type CartState = StateTemplate & {
	items?: CartItem[]
	shippingAddress?: ShippingAddress
	paymentMethod?: PaymentMethod
}

export type RootState = ReturnType<typeof store.getState>
