import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { IProduct, ProductDetailsState, RootState } from '../types'

const initialState: ProductDetailsState = {}

export const fetchProductById = createAsyncThunk(
	'productDetails/fetchProductById',
	async (id: string) => {
		const res = await axios.get<IProduct>(`/api/products/${id}`)
		if (res.status === 200) return res.data
	}
)

const productDetails = createSlice({
	name: 'productDetails',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProductById.pending, (state) => {
				state.status = 'pending'
				state.error = undefined
			})
			.addCase(fetchProductById.fulfilled, (state, action) => {
				state.status = 'finished'
				state.product = action.payload
				state.error = undefined
			})
			.addCase(fetchProductById.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error
			})
	},
})

export const getProductDetailsState = (state: RootState) => state.productDetails

export default productDetails.reducer
