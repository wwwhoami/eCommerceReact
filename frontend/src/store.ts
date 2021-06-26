import { configureStore } from '@reduxjs/toolkit'
import productDetailsReducer from './reducers/productDetailsReducer'
import productListReducer from './reducers/productListReducer'
import cartReducer from './reducers/cartReducer'

const store = configureStore({
	reducer: {
		productList: productListReducer,
		productDetails: productDetailsReducer,
		cart: cartReducer,
	},
})

export default store
