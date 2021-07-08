import { userSignUp } from './../../../frontend/src/reducers/userReducer'
import asyncHandler from 'express-async-handler'
import Order from '../../models/orderModel'

/**
 * @desc   Create new order
 * @route  POST /api/orders/
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
