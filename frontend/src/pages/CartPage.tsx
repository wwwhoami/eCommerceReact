import { VStack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import CartListItem from '../components/CartListItem'
import Message from '../components/Message'
import PageHeader from '../components/PageHeader'
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
		<>
			<VStack spacing={14} alignItems="start">
				<PageHeader>Shopping Cart</PageHeader>
				{cartItems.length === 0 ? (
					<>
						<Message status="error">Your cart is empty</Message>
					</>
				) : (
					<VStack spacing={10}>
						{cartItems.map((item) => (
							<CartListItem item={item} />
						))}
					</VStack>
				)}
			</VStack>
		</>
	)
}

export default CartPage
