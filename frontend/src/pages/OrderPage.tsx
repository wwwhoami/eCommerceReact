import { Stack, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import OrderInfo from '../components/order/OrderInfo'
import ProductListItem from '../components/product/ProductListItem'
import Message from '../components/util/Message'
import PageHeader from '../components/util/PageHeader'
import { fetchOrderById, getOrderById } from '../reducers/orderReducer'

interface Props {}

const OrderPage = (props: Props) => {
	const dispatch = useDispatch()
	const { id: orderId } = useParams<{ id: string }>()

	const orderDetails = useSelector(getOrderById)(orderId)

	useEffect(() => {
		if (!orderDetails) dispatch(fetchOrderById(orderId))
	}, [dispatch, orderDetails, orderId])

	console.log(orderDetails)
	return (
		<Stack>
			<VStack spacing={4} alignItems="start">
				<PageHeader>Order Details</PageHeader>

				{!orderDetails ? (
					<Message status="error">Order does not exist</Message>
				) : (
					<>
						<OrderInfo
							orderId={orderId}
							orderInfo={{
								createdAt: orderDetails.createdAt,
								shippingAddress: orderDetails.shippingAddress,
								payment: orderDetails.payment,
								delivery: orderDetails.delivery,
								price: orderDetails.price,
								itemQty: orderDetails.orderItems
									.map((item) => item.quantity)
									.reduce((qty, itemQty) => qty + itemQty),
							}}
						/>
						{orderDetails.orderItems.map((item, index) => (
							<ProductListItem key={index} item={item} h={140} />
						))}
					</>
				)}
			</VStack>
		</Stack>
	)
}

export default OrderPage
