import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { CartItem, CartItemQty, CartState, IProduct, State } from '../types'

const cartItemsFromStorage = localStorage.getItem('cartItems')

const initialState: CartState = {
	cart:
		typeof cartItemsFromStorage === 'string'
			? JSON.parse(cartItemsFromStorage)
			: [],
	error: {},
}

export const addToCart = createAsyncThunk(
	'cart/addToCart',
	async (itemData: { itemId: string; quantity: number }, { dispatch }) => {
		const { itemId, quantity } = itemData

		const res = await axios.get<IProduct>(`/api/products/${itemId}`)

		if (res.status === 200) {
			const item: CartItem = { ...res.data, quantity }
			dispatch(addCartItem(item))
		}
	}
)

const cartReducer = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addCartItem(state, action: PayloadAction<CartItem>) {
			const itemIdx = state.cart?.findIndex(
				(item) => item._id === action.payload._id
			)
			if (itemIdx === -1) state.cart?.push(action.payload)
			else {
				if (action.payload.countInStock - state.cart[itemIdx].quantity >= 0)
					state.cart[itemIdx].quantity += action.payload.quantity
				else throw new Error('Not enough items in stock!')
			}
		},
		removeCartItem(state, action: PayloadAction<string>) {
			const itemIdx = state.cart?.findIndex(
				(item) => item._id === action.payload
			)
			if (itemIdx !== -1) {
				state.cart.splice(itemIdx, 1)
				localStorage.setItem('cartItems', JSON.stringify(state.cart))
			} else {
				state.error.message = 'No such item in the cart!'
			}
		},
		setCartItemQuantity(state, action: PayloadAction<CartItemQty>) {
			const itemIdx = state.cart?.findIndex(
				(item) => item._id === action.payload._id
			)
			if (itemIdx !== -1) {
				console.log(new Error('Not enough items in stock!'))
				if (state.cart[itemIdx].countInStock - action.payload.quantity >= 0)
					state.cart[itemIdx].quantity = action.payload.quantity
				else state.error.message = 'Not enough items in stock!'
			} else state.error.message = 'No such item in the cart!'
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addToCart.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(addToCart.fulfilled, (state) => {
				state.status = 'finished'
				localStorage.setItem('cartItems', JSON.stringify(state.cart))
			})
			.addCase(addToCart.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error
			})
	},
})

export const getCartItems = (state: State) => state.cart.cart

export const getCartItemsCount = (state: State) => state.cart.cart.length

export const getCartItemById = (state: State) => (id: string | undefined) =>
	state.cart.cart.find((item) => item._id === id)

export const itemCanBeAddedToCart = (state: State) => (
	id: string | undefined
) => {
	const itemInCart = state.cart.cart.find((item) => item._id === id)
	return itemInCart ? itemInCart.countInStock - itemInCart.quantity >= 0 : true
}

export const {
	addCartItem,
	removeCartItem,
	setCartItemQuantity,
} = cartReducer.actions
export default cartReducer.reducer
