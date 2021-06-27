import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { CartItem, CartItemQty, CartState, IProduct, State } from '../types'

const cartItemsFromStorage = localStorage.getItem('cartItems')

const initialState: CartState = {
	items:
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
			const itemIdx = state.items?.findIndex(
				(item) => item._id === action.payload._id
			)
			if (itemIdx === -1) state.items?.push(action.payload)
			else {
				if (action.payload.countInStock - state.items[itemIdx].quantity >= 0)
					state.items[itemIdx].quantity += action.payload.quantity
				else throw new Error('Not enough items in stock!')
			}
		},
		removeCartItem(state, action: PayloadAction<string>) {
			const itemIdx = state.items?.findIndex(
				(item) => item._id === action.payload
			)
			if (itemIdx !== -1) {
				state.items.splice(itemIdx, 1)
				localStorage.setItem('cartItems', JSON.stringify(state.items))
			} else {
				state.error.message = 'No such item in the cart!'
			}
		},
		setCartItemQuantity(state, action: PayloadAction<CartItemQty>) {
			const itemIdx = state.items?.findIndex(
				(item) => item._id === action.payload._id
			)
			if (itemIdx !== -1) {
				console.log(new Error('Not enough items in stock!'))
				if (state.items[itemIdx].countInStock - action.payload.quantity >= 0)
					state.items[itemIdx].quantity = action.payload.quantity
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
				localStorage.setItem('cartItems', JSON.stringify(state.items))
			})
			.addCase(addToCart.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error
			})
	},
})

export const getCartItems = (state: State) => state.cart.items

export const getCartItemsCount = (state: State) =>
	state.cart.items.length
		? state.cart.items.reduce((itemReducer, item) => ({
				...itemReducer,
				quantity: itemReducer.quantity + item.quantity,
		  })).quantity
		: 0

export const getCartItemById = (state: State) => (id: string | undefined) =>
	state.cart.items.find((item) => item._id === id)

export const itemCanBeAddedToCart =
	(state: State) => (id: string | undefined) => {
		const itemInCart = state.cart.items.find((item) => item._id === id)
		return (
			itemInCart === undefined ||
			itemInCart.countInStock - itemInCart.quantity > 0
		)
	}

export const getCartItemQuantity = (state: State) => (id: string | undefined) =>
	state.cart.items.find((item) => item._id === id)?.quantity || 0

export const { addCartItem, removeCartItem, setCartItemQuantity } =
	cartReducer.actions
export default cartReducer.reducer
