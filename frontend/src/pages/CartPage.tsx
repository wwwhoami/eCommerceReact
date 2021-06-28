import {
	Button,
	HStack,
	Stack,
	StackDivider,
	Text,
	useBreakpointValue,
	VStack,
} from '@chakra-ui/react'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link as ReactRouterLink } from 'react-router-dom'
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
	const isMdDisplay = useBreakpointValue({ base: false, md: true })

	const totalItemQty = cartItems
		.map((cartItem) => cartItem.quantity)
		.reduce((itemQtyAccumulator, qty) => itemQtyAccumulator + qty)

	const totalCost = cartItems
		.map((cartItem) => cartItem.quantity * cartItem.price)
		.reduce((costAccumulator, itemCost) => costAccumulator + itemCost)
		.toFixed(2)

	return (
		<Stack>
			<VStack spacing={4} alignItems="start">
				<PageHeader>Shopping Cart</PageHeader>
				{cartItems.length === 0 ? (
					<>
						<Message status="error">Your cart is empty</Message>
					</>
				) : (
					<Stack
						w="100%"
						maxW="1200px"
						alignSelf="center"
						justifyContent="space-between"
						flexDir={{ base: 'column-reverse', lg: 'row' }}
						spacing={0}
					>
						<VStack
							spacing={{ base: 4, md: 6, lg: 7 }}
							my={{ base: 10, lg: 0 }}
						>
							{cartItems.map((item) => (
								<CartListItem item={item} />
							))}
						</VStack>
						<Stack
							flexDir={{ base: 'row', lg: 'column' }}
							divider={<StackDivider borderColor="gray.200" />}
							borderWidth="1px"
							rounded="lg"
							shadow="lg"
							p={{ base: 2, md: 4, lg: 6 }}
							fontSize="xl"
							w={{ base: 'auto', lg: 300 }}
							h="auto"
							maxH="400px"
							spacing={3}
							position="sticky"
							top={{ base: '60px', lg: '80px' }}
							justifyContent="space-around"
							bgColor="white"
							my={10}
						>
							{isMdDisplay && (
								<Text fontSize="3xl" fontWeight={600}>
									Order info
								</Text>
							)}
							<HStack
								justifyContent="space-between"
								alignItems="center"
								w={{ base: '40%', md: 'auto' }}
							>
								<Text>{totalItemQty} item(s)</Text>
								<Text>${totalCost}</Text>
							</HStack>
							{isMdDisplay && (
								<HStack
									justifyContent="space-between"
									alignItems="center"
									fontWeight={600}
								>
									<Text>TOTAL</Text>
									<Text>${totalCost}</Text>
								</HStack>
							)}
							<Button
								as={ReactRouterLink}
								to="/checkout"
								_hover={{
									textDecor: 'none',
								}}
								w={{ base: '40%', md: 'auto' }}
								leftIcon={<FontAwesomeIcon icon={faCartArrowDown} />}
							>
								To checkout
							</Button>
						</Stack>
					</Stack>
				)}
			</VStack>
		</Stack>
	)
}

export default CartPage
