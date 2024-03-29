import { configureStore } from '@reduxjs/toolkit'
import productDetailsReducer from './reducers/productDetailsReducer'
import productListReducer from './reducers/productListReducer'
import cartReducer from './reducers/cartReducer'
import userReducer from './reducers/userReducer'
import orderReducer from './reducers/orderReducer'

const store = configureStore({
	reducer: {
		productList: productListReducer,
		productDetails: productDetailsReducer,
		cart: cartReducer,
		user: userReducer,
		order: orderReducer
	},
})

export default store
