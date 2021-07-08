import {
	Box,
	Button,
	chakra,
	Heading,
	Stack,
	StackDivider,
	Text,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
	emptyCart,
	getCartItems,
	getItemsPrice,
	getTotalItemQty,
} from '../../reducers/cartReducer'
import {
	getShippingAddress,
	getPaymentMethod,
	createOrder,
	getOrderStatus,
	getCreatedOrderId,
} from '../../reducers/orderReducer'
import OrderItemsList from './OrderItemsList'

interface Props {}

const CheckoutSummary = (props: Props) => {
	const dispatch = useDispatch()
	const status = useSelector(getOrderStatus)

	const shippingAddress = useSelector(getShippingAddress)
	const { email, country, state, streetAddress, city, postalCode } =
		shippingAddress!!
	const orderItems = useSelector(getCartItems)
	const paymentMethod = useSelector(getPaymentMethod)
	const totalItemQty = useSelector(getTotalItemQty)
	const itemsPrice = useSelector(getItemsPrice)
	const shippingPrice = itemsPrice > 100 ? 0 : 20
	const taxPrice = 0.15 * itemsPrice
	const totalPrice = itemsPrice + shippingPrice + taxPrice

	const orderId = useSelector(getCreatedOrderId)

	const history = useHistory()

	const onSubmit = () => {
		if (
			typeof orderItems !== 'undefined' &&
			typeof shippingAddress !== 'undefined' &&
			typeof paymentMethod !== 'undefined' &&
			typeof itemsPrice !== 'undefined' &&
			typeof taxPrice !== 'undefined' &&
			typeof shippingPrice !== 'undefined' &&
			typeof totalPrice !== 'undefined'
		) {
			var orderInfo = dispatch(
				createOrder({
					orderItems,
					shippingAddress,
					paymentMethod,
					itemsPrice,
					taxPrice,
					shippingPrice,
					totalPrice,
				})
			)
			console.log(orderInfo)
		}
	}

	useEffect(() => {
		if (status === 'finished' && orderId) {
			history.push(`/order/${orderId}`)
			dispatch(emptyCart)
		}
	}, [dispatch, history, orderId, status])

	return (
		<>
			<Box px={{ base: 4, sm: 6 }} py={3} position="sticky" top="60px">
				<Button type="submit" colorScheme="pink" w="20%" onClick={onSubmit}>
					Order
				</Button>
			</Box>
			<Stack
				px={4}
				py={5}
				p={[null, 6]}
				bg="white"
				spacing={2}
				divider={<StackDivider borderColor="gray.200" />}
			>
				<Box>
					<Heading as="h3" fontSize="2xl">
						Shipping
					</Heading>
					<chakra.ul px={6}>
						<chakra.li>
							<chakra.span fontWeight="semibold">Email: </chakra.span>
							{email}
						</chakra.li>
						<chakra.li>
							<chakra.span fontWeight="semibold">Country: </chakra.span>
							{country}
						</chakra.li>
						<chakra.li>
							<chakra.span fontWeight="semibold">State: </chakra.span>
							{state}
						</chakra.li>
						<chakra.li>
							<chakra.span fontWeight="semibold">Street Address: </chakra.span>
							{streetAddress}
						</chakra.li>
						<chakra.li>
							<chakra.span fontWeight="semibold">City: </chakra.span>
							{city}
						</chakra.li>
						<chakra.li>
							<chakra.span fontWeight="semibold">Postal Code: </chakra.span>
							{postalCode}
						</chakra.li>
					</chakra.ul>
				</Box>
				<Box>
					<Heading as="h3" fontSize="2xl">
						Payment Method
					</Heading>
					<Text>{paymentMethod}</Text>
				</Box>

				<Box>
					<Heading as="h3" fontSize="2xl">
						Ordered Items
					</Heading>
					<Text fontSize="xl">
						<chakra.span fontWeight="semibold">
							{totalItemQty} item(s):{' '}
						</chakra.span>
						${itemsPrice.toFixed(2)}
					</Text>
					<Text fontSize="xl">
						<chakra.span fontWeight="semibold">Shipping price: </chakra.span>$
						{shippingPrice.toFixed(2)}
					</Text>
					<Text fontSize="xl">
						<chakra.span fontWeight="semibold">Tax: </chakra.span>$
						{taxPrice.toFixed(2)}
					</Text>
					<Text fontSize="2xl">
						<chakra.span fontWeight="semibold">TOTAL: </chakra.span>$
						{totalPrice.toFixed(2)}
					</Text>
					<OrderItemsList />
				</Box>
			</Stack>
		</>
	)
}

export default CheckoutSummary
