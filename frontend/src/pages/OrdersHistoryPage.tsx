import { VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrderListItem from '../components/order/OrderListItem'
import Message from '../components/util/Message'
import PageHeader from '../components/util/PageHeader'
import { fetchUserOrders, getOrders } from '../reducers/orderReducer'
import { isLoggedIn } from '../reducers/userReducer'

interface Props {}

const OrdersHistoryPage = (props: Props) => {
	const dispatch = useDispatch()
	const orders = useSelector(getOrders)
	const isLogged = useSelector(isLoggedIn)

	useEffect(() => {
		dispatch(fetchUserOrders())
	}, [dispatch, isLogged])

	return (
		<VStack spacing={4} alignItems="start">
			<PageHeader>Order History</PageHeader>
			{!orders || orders.length === 0 ? (
				<Message status="error">No orders</Message>
			) : (
				<VStack spacing={7} my={{ base: 6, lg: 0 }} w="100%" alignItems="start">
					{orders.map((item) => (
						<OrderListItem key={item._id} order={item} />
					))}
				</VStack>
			)}
		</VStack>
	)
}

export default OrdersHistoryPage
