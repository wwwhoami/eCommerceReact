import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { IProduct, ProductListState, State } from '../types'

export const fetchProducts = createAsyncThunk(
	'productList/fetchProducts',
	async () => {
		const res = await axios.get<IProduct[]>('/api/products')
		if (res.status === 200) return res.data
	}
)

const initialState: ProductListState = {
	status: 'finished',
	products: [],
}

const productReducer = createSlice({
	name: 'productList',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'finished'
				state.products = action.payload
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.error
			})
	},
})

export const getProductListState = (state: State) => state.productList

export default productReducer.reducer
