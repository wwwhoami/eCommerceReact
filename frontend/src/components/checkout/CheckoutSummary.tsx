import {
	Box,
	Button,
	chakra,
	Heading,
	Stack,
	StackDivider,
	Text,
} from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import {
	getPaymentMethod,
	getShippingAddress,
	getTotalCost,
	getTotalItemQty,
} from '../../reducers/cartReducer'
import OrderItemsList from './OrderItemsList'

interface Props {}

const CheckoutSummary = (props: Props) => {
	const shippingAddress = useSelector(getShippingAddress)
	const { email, country, state, streetAddress, city, postalCode } =
		shippingAddress!!
	const paymentMethod = useSelector(getPaymentMethod)
	const totalItemQty = useSelector(getTotalItemQty)
	const totalCost = useSelector(getTotalCost)
	const shippingPrice = totalCost > 100 ? 0 : 20
	const taxPrice = 0.15 * totalCost

	return (
		<>
			<Box px={{ base: 4, sm: 6 }} py={3}>
				<Button type="submit" colorScheme="pink" w="20%">
					Save
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
						${totalCost.toFixed(2)}
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
						{(totalCost + shippingPrice + taxPrice).toFixed(2)}
					</Text>
					<OrderItemsList />
				</Box>
			</Stack>
		</>
	)
}

export default CheckoutSummary
