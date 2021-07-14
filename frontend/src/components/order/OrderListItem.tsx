import {
	Box,
	Stack,
	HStack,
	Button,
	Image,
	Text,
	Heading,
	LinkBox,
} from '@chakra-ui/react'
import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Order } from '../../types'

interface Props {
	order: Order
}

const OrderListItem = ({ order }: Props) => {
	const id = order._id
	const orderDate = new Date(order.createdAt).toLocaleString().split(',')[0]
	const cost = order.price.totalPrice
	const quantity = order.orderItems
		.map((item) => item.quantity)
		.reduce((qty, itemQty) => qty + itemQty)
	const items = order.orderItems
		.slice(0, 4)
		.map((item) => ({ image: item.image, product: item.product }))

	return (
		<Box
			p={4}
			w={{ base: '100%', md: '80%' }}
			borderWidth="1px"
			rounded="lg"
			shadow="lg"
			bgColor="white"
		>
			<Heading as="h2" fontSize="xl" fontWeight="semibold">
				Order: {id}
			</Heading>
			<Text pt={2} fontSize="lg">
				{orderDate} | ${cost.toFixed(2)} | {quantity} items
			</Text>
			<Stack
				pt={3}
				flexDir={{ base: 'column', md: 'row' }}
				justifyContent="space-between"
				spacing={4}
			>
				<HStack spacing={4}>
					{items.map(({ image, product }, index) => (
						<LinkBox
							key={index}
							as={ReactRouterLink}
							to={`/product/${product}`}
						>
							<Image h={20} w={20} fit="cover" src={image} />
						</LinkBox>
					))}
				</HStack>
				<Button
					as={ReactRouterLink}
					to={`/order/${id}`}
					variant="solid"
					w={{ base: '100%', md: 'auto' }}
					colorScheme="pink"
					alignSelf="flex-end"
				>
					Order Details
				</Button>
			</Stack>
		</Box>
	)
}

export default OrderListItem
