import { userSignUp } from './../../../frontend/src/reducers/userReducer'
import asyncHandler from 'express-async-handler'
import Order from '../../models/orderModel'

/**
 * @desc   Create new order
 * @route  POST /api/order/
 * @access PRIVATE
 */
export const createOrder = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body

	if (orderItems && orderItems.length === 0) {
		res.status(400)
		throw new Error('No order items')
	} else {
		const newOrderItems = orderItems.map((orderItem: { _id: any }) => {
			const product = orderItem._id
			delete orderItem._id
			return {
				product,
				...orderItem,
			}
		})

		const order = new Order({
			orderItems: newOrderItems,
			user: req.user?._id,
			shippingAddress,
			paymentMethod: { id: paymentMethod },
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		})

		const createdOrder = await order.save()

		res.status(201).json(createdOrder)
	}
})

/**
 * @desc   Get order by id
 * @route  GET /api/order/:id
 * @access PRIVATE
 */
export const getOrderById = asyncHandler(async (req, res) => {
	const { id } = req.params
	const order = await Order.findById(id)

	if (!order?.user.equals(req.user?._id) && req.user?.isAdmin === false) {
		res.status(403)
		throw new Error('Not allowed')
	} else if (order) {
		return res.status(200).json(order)
	}
	res.status(404)
	throw new Error('Order not found!')
})

/**
 * @desc   Get orders of user
 * @route  GET /api/order/
 * @access PRIVATE
 */
export const getUserOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user?._id })
	if (orders) {
		return res.status(200).json(orders)
	}
	res.status(404)
	throw new Error('Orders not found!')
})
