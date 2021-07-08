import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Order, PaymentMethod, RootState, ShippingAddress } from '../types'
import { CartItem, OrderState } from './../types'

const initialState: OrderState = {}

type OrderRequestBody = {
	orderItems: CartItem[]
	shippingAddress: ShippingAddress
	paymentMethod: string
	itemsPrice: number
	taxPrice: number
	shippingPrice: number
	totalPrice: number
}

export const createOrder = createAsyncThunk<
	Order | undefined,
	OrderRequestBody,
	{ state: RootState }
>('order/createOrder', async (order) => {
	const res = await axios.post<Order>(`/api/order/`, order)
	if (res.status === 201 && res.data) return res.data
})

const orderReducer = createSlice({
	name: 'order',
	initialState,
	reducers: {
		saveShippingAddress(state, action: PayloadAction<ShippingAddress>) {
			state.shippingAddress = action.payload
		},
		savePaymentMethod(state, action: PayloadAction<PaymentMethod>) {
			state.paymentMethod = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.status = 'pending'

				state.error = undefined
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.status = 'finished'
				state.createdOrder = action.payload
				state.error = undefined
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error
			})
	},
})

export const getShippingAddress = (state: RootState) =>
	state.order.shippingAddress

export const getPaymentMethod = (state: RootState) => state.order.paymentMethod

export const getOrderStatus = (state: RootState) => state.order.status

export const getCreatedOrderId = (state: RootState) =>
	state.order.createdOrder?._id

export const { saveShippingAddress, savePaymentMethod } = orderReducer.actions

export default orderReducer.reducer
