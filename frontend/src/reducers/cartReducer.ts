import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { CartItem, CartItemQty, CartState, IProduct, State } from '../types'

const cartItemsFromStorage = localStorage.getItem('cartItems')

const initialState: CartState = {
	items: cartItemsFromStorage && JSON.parse(cartItemsFromStorage),
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
			if (state.items) {
				const itemIdx = state.items.findIndex(
					(item) => item._id === action.payload._id
				)
				if (itemIdx === -1) state.items.push(action.payload)
				else {
					if (action.payload.countInStock - state.items[itemIdx].quantity >= 0)
						state.items[itemIdx].quantity += action.payload.quantity
					else state.error = new Error('Not enough items in stock!')
				}
			} else {
				state.items = [action.payload]
			}
		},
		removeCartItem(state, action: PayloadAction<string>) {
			if (state.items && state.items.length !== 0) {
				const itemIdx = state.items.findIndex(
					(item) => item._id === action.payload
				)
				if (itemIdx !== -1) {
					state.items.splice(itemIdx, 1)
					localStorage.setItem('cartItems', JSON.stringify(state.items))
				} else {
					state.error = new Error('No such item in the cart!')
				}
			} else state.error = new Error('Cart is empty!')
		},
		setCartItemQuantity(state, action: PayloadAction<CartItemQty>) {
			if (state.items && state.items.length !== 0) {
				const itemIdx = state.items?.findIndex(
					(item) => item._id === action.payload._id
				)
				if (itemIdx !== -1) {
					if (state.items[itemIdx].countInStock - action.payload.quantity >= 0)
						state.items[itemIdx].quantity = action.payload.quantity
					else state.error = new Error('Not enough items in stock!')
				} else state.error = new Error('No such item in the cart!')
			} else state.error = new Error('Cart is empty!')
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addToCart.pending, (state) => {
				state.status = 'loading'

				state.error = undefined
			})
			.addCase(addToCart.fulfilled, (state) => {
				state.status = 'finished'
				localStorage.setItem('cartItems', JSON.stringify(state.items))
				state.error = undefined
			})
			.addCase(addToCart.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error
			})
	},
})

export const getCartItems = (state: State) => state.cart.items

export const getCartItemsCount = (state: State) =>
	state?.cart?.items?.length
		? state.cart.items.reduce((itemReducer, item) => ({
				...itemReducer,
				quantity: itemReducer.quantity + item.quantity,
		  })).quantity
		: 0

export const getCartItemById = (state: State) => (id: string | undefined) =>
	state?.cart?.items && state.cart.items.find((item) => item._id === id)

export const itemCanBeAddedToCart =
	(state: State) => (id: string | undefined) => {
		const itemInCart =
			state?.cart?.items && state.cart.items.find((item) => item._id === id)
		if (itemInCart?.countInStock)
			return itemInCart.countInStock - itemInCart.quantity > 0
		return true
	}

export const getCartItemQuantity = (state: State) => (id: string | undefined) =>
	(state?.cart?.items &&
		state.cart.items.find((item) => item._id === id)?.quantity) ||
	0

export const { addCartItem, removeCartItem, setCartItemQuantity } =
	cartReducer.actions

export default cartReducer.reducer
