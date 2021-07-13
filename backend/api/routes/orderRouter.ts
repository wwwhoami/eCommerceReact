import express from 'express'
import { checkAuth } from './../../middleware/authMiddleware'
import {
	createOrder,
	getOrderById,
	getUserOrders,
} from './../controllers/orderController'

const orderRouter = express.Router()

orderRouter.use(checkAuth)

orderRouter.route('/').post(createOrder).get(getUserOrders)

orderRouter.route('/:id').get(getOrderById)

export default orderRouter
