import { VStack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { getCartItems } from '../../reducers/cartReducer'
import ProductListItem from '../product/ProductListItem'

interface Props {}

const CheckoutItemsList = (props: Props) => {
	const cartItems = useSelector(getCartItems)

	return (
		<VStack spacing={{ base: 4, md: 6, lg: 7 }} my={3}>
			{cartItems &&
				cartItems.map((item) => (
					<ProductListItem h={170} key={item._id} item={item} />
				))}
		</VStack>
	)
}

export default CheckoutItemsList
