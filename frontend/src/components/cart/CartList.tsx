import { VStack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { CartItem } from '../../types'
import CartListItem from './CartListItem'

interface Props {
	cartItems: CartItem[]
}

function CartList({ cartItems }: Props): ReactElement {
	return (
		<VStack spacing={{ base: 4, md: 6, lg: 7 }} my={{ base: 10, lg: 0 }}>
			{cartItems.map((item) => (
				<CartListItem key={item.id} item={item} />
			))}
		</VStack>
	)
}

export default CartList
