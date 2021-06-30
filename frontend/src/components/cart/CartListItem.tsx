import {
	HStack,
	IconButton,
	Image,
	Input,
	LinkBox,
	Stack,
	Text,
	Tooltip,
	VStack,
} from '@chakra-ui/react'
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	itemCanBeAddedToCart,
	removeCartItem,
	setCartItemQuantity,
} from '../../reducers/cartReducer'
import { Link as ReactRouterLink } from 'react-router-dom'
import { CartItem } from '../../types'

interface Props {
	item: CartItem
}

const CartListItem = ({ item }: Props) => {
	const [quantity, setQuantity] = useState(item.quantity)
	const dispatch = useDispatch()
	const canBeAddedToCart = useSelector(itemCanBeAddedToCart)(item._id)

	const removeFromCartHandler = (id: string) => {
		dispatch(removeCartItem(id))
	}

	useEffect(() => {
		dispatch(setCartItemQuantity({ _id: item._id, quantity }))
	}, [quantity, dispatch, item._id, canBeAddedToCart])

	return (
		<HStack
			key={item._id}
			justifyContent="start"
			spacing={5}
			h="200px"
			minW="400px"
			w="100%"
			maxW="700px"
			borderWidth="1px"
			rounded="lg"
			shadow="lg"
		>
			<LinkBox
				as={ReactRouterLink}
				to={`/product/${item._id}`}
				w="40%"
				h="100%"
			>
				<Image src={item.image} alt={item.name} fit="cover" h="100%" />
			</LinkBox>
			<VStack h="100%" justifyContent="space-between" w="60%" pr={4}>
				<Stack spacing={3} py={2} isTruncated maxH="80%" w="100%">
					<Text
						fontSize="xl"
						whiteSpace="initial"
						w="80%"
						as={ReactRouterLink}
						to={`/product/${item._id}`}
					>
						{item.name}
					</Text>
					<Text fontSize="xl" w="20%">
						${(item.price * quantity).toFixed(2)}
					</Text>
				</Stack>

				<HStack justifyContent="space-between" width="100%">
					<HStack maxW="200px" justifySelf="center" py={2}>
						<IconButton
							aria-label="Decrement quantity"
							size="sm"
							onClick={() =>
								quantity > item.countInStock
									? setQuantity(item.countInStock)
									: setQuantity((prev) => prev - 1)
							}
							disabled={quantity <= 1}
							icon={<FontAwesomeIcon icon={faMinus} />}
						></IconButton>
						<Input
							pr="4.5rem"
							type="text"
							value={quantity}
							variant="filled"
							onChange={(e) => {
								const parsedQty = Number.parseInt(e.target.value)
								if (parsedQty) {
									if (parsedQty > item.countInStock)
										return setQuantity(item.countInStock)
									else if (parsedQty < 0) return setQuantity(0)
									else return setQuantity(parsedQty)
								} else return setQuantity(1)
							}}
							isInvalid={quantity > item.countInStock && quantity !== 0}
						/>
						<IconButton
							aria-label="Increment quantity"
							size="sm"
							onClick={() =>
								quantity < 0 ? setQuantity(0) : setQuantity((prev) => prev + 1)
							}
							disabled={!canBeAddedToCart}
							icon={<FontAwesomeIcon icon={faPlus} />}
						></IconButton>
					</HStack>
					<HStack>
						<Tooltip label="Remove from cart" fontSize="md">
							<IconButton
								aria-label="Remove from cart"
								size="sm"
								color="red.500"
								onClick={() => removeFromCartHandler(item._id)}
								icon={<FontAwesomeIcon icon={faTrash} />}
							></IconButton>
						</Tooltip>
					</HStack>
				</HStack>
			</VStack>
		</HStack>
	)
}

export default CartListItem
