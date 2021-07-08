import { Button, VStack } from '@chakra-ui/react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { emptyCart } from '../../reducers/cartReducer'
import { CartItem } from '../../types'
import CartListItem from './CartListItem'

interface Props {
	cartItems: CartItem[]
}
//

function CartList({ cartItems }: Props): ReactElement {
	const dispatch = useDispatch()
	return (
		<VStack spacing={{ base: 4, md: 6, lg: 7 }} my={{ base: 6, lg: 0 }}>
			<Button
				colorScheme="red"
				w="100%"
				variant="ghost"
				onClick={() => dispatch(emptyCart())}
				leftIcon={<FontAwesomeIcon icon={faTrash} />}
			>
				Empty Cart
			</Button>
			{cartItems.map((item) => (
				<CartListItem key={item._id} item={item} />
			))}
		</VStack>
	)
}

export default CartList
