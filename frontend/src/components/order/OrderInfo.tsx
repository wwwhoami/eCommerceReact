import {
	VStack,
	Box,
	Heading,
	Stack,
	HStack,
	Text,
	StackDivider,
} from '@chakra-ui/react'
import React from 'react'
import { Order } from '../../types'

interface Props {
	orderId: string
	orderInfo: Omit<Order, 'orderItems' | 'user' | '_id'> & { itemQty: number }
}

const OrderInfo = ({ orderId, orderInfo }: Props) => {
	const { createdAt, shippingAddress, payment, delivery, price, itemQty } =
		orderInfo

	const orderDate = new Date(createdAt).toLocaleString().split(',')[0]

	return (
		<VStack
			w="100%"
			maxW="1200px"
			alignSelf="start"
			alignItems="start"
			justifyContent="space-between"
			spacing={4}
			divider={<StackDivider borderColor="gray.200" />}
		>
			<Box w="80%">
				<Heading as="h2" fontSize="3xl">
					Details
				</Heading>
				<Stack flexDir={['column', null, 'row']} justifyContent="space-between">
					<Box>
						<Heading as="h3" fontSize="2xl">
							Order
						</Heading>
						<Text>{orderId}</Text>
						<Text>{orderDate}</Text>
					</Box>
					<Box>
						<Heading as="h3" fontSize="2xl">
							Payment
						</Heading>
						<Text>Method: {payment.method}</Text>
						<Text>Status: {payment.isPaid ? 'Paid' : 'Not paid'}</Text>
					</Box>
					<Box>
						<Heading as="h3" fontSize="2xl">
							Delivery
						</Heading>
						<Text>
							Status: {delivery.isDelivered ? 'Delivered' : 'Not delivered'}
						</Text>
					</Box>
				</Stack>
			</Box>
			<Box>
				<Heading as="h2" fontSize="3xl">
					Shipping address
				</Heading>
				<Text>{shippingAddress.streetAddress}</Text>
				<Text>
					{shippingAddress.postalCode}, {shippingAddress.city},{' '}
					{shippingAddress.state}, {shippingAddress.country}
				</Text>
				<Text>Contact mail: {shippingAddress.email}</Text>
			</Box>
			<Box w={['100%', null, '360px']}>
				<Heading as="h2" fontSize="3xl">
					Order
				</Heading>
				<HStack justifyContent="space-between">
					<Text>{itemQty} items</Text>
					<Text>${price.itemsPrice}</Text>
				</HStack>
				<HStack justifyContent="space-between">
					<Text>Shipping</Text>
					<Text>${price.shippingPrice}</Text>
				</HStack>
				<HStack justifyContent="space-between">
					<Text>Tax</Text>
					<Text>${price.taxPrice}</Text>
				</HStack>
				<HStack justifyContent="space-between">
					<Text>TOTAL</Text>
					<Text>${price.totalPrice}</Text>
				</HStack>
			</Box>
		</VStack>
	)
}

export default OrderInfo
