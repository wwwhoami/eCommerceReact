import { Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import CartList from '../components/cart/CartList'
import CartSummary from '../components/cart/CartSummary'
import Message from '../components/util/Message'
import PageHeader from '../components/util/PageHeader'
import { getCartItems } from '../reducers/cartReducer'

type Params = {
	id: string
}

const CartPage = ({
	match,
	location,
	history,
}: RouteComponentProps<Params>) => {
	const cartItems = useSelector(getCartItems)

	return (
		<Stack>
			<VStack spacing={4} alignItems="start">
				<PageHeader>Shopping Cart</PageHeader>
				{!cartItems || cartItems.length === 0 ? (
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
							totalItemQty={cartItems
								.map((cartItem) => cartItem.quantity)
								.reduce((itemQtyAccumulator, qty) => itemQtyAccumulator + qty)}
							totalCost={cartItems
								.map((cartItem) => cartItem.quantity * cartItem.price)
								.reduce(
									(costAccumulator, itemCost) => costAccumulator + itemCost
								)
								.toFixed(2)}
						/>
					</Stack>
				)}
			</VStack>
		</Stack>
	)
}

export default CartPage
