import { Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/util/PageHeader'
import { getOrderById } from '../reducers/orderReducer'

interface Props {}

const OrderPage = (props: Props) => {
	const { id: orderId } = useParams<{ id: string }>()
	const orderDetails = useSelector(getOrderById)(orderId)

	console.log(orderDetails)
	return (
		<Stack>
			<VStack spacing={4} alignItems="start">
				<PageHeader>Order Details</PageHeader>

				{/* {!orderDetails || orderDetails.length === 0 ? (
					<Message status="error">Your cart is empty</Message>
				) : (
					<Stack
						w="100%"
						maxW="1200px"
						alignSelf="center"
						justifyContent="space-between"
						flexDir={{ base: 'column-reverse', lg: 'row' }}
						spacing={0}
					>
						<CartList cartItems={cartItems} />
						<CartSummary
							totalItemQty={totalItemQty}
							totalCost={totalCost.toFixed(2)}
						/>
					</Stack> */}
				{/* )} */}
			</VStack>
		</Stack>
	)
}

export default OrderPage
