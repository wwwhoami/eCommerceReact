import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { IProduct, ProductListState, RootState } from '../types'

export const fetchProducts = createAsyncThunk(
	'productList/fetchProducts',
	async () => {
		const res = await axios.get<IProduct[]>('/api/products')
		if (res.status === 200) return res.data
	}
)

const initialState: ProductListState = {}

const productReducer = createSlice({
	name: 'productList',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.status = 'loading'
				state.error = undefined
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'finished'
				state.products = action.payload
				state.error = undefined
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error
			})
	},
})

export const getProductListState = (state: RootState) => state.productList

export default productReducer.reducer
