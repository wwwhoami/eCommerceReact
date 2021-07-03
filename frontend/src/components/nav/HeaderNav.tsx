import {
	Center,
	chakra,
	Collapse,
	Flex,
	IconButton,
	Link,
	Stack,
	Tooltip,
	useBreakpointValue,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react'
import {
	faBars,
	faShoppingBasket,
	faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link as ReactRouterLink } from 'react-router-dom'
import { getCartItemsCount } from '../../reducers/cartReducer'
import { userIsLoggedIn } from '../../reducers/userReducer'
import SignoutButton from '../user/SignOutButton'
import SignUpModal from '../user/SignUpModal'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import { NavItems } from './NavItem'

const Header = () => {
	const countInCart = useSelector(getCartItemsCount)
	const isAuthenticated = useSelector(userIsLoggedIn)
	const { isOpen, onToggle } = useDisclosure()

	return (
		<Center
			display="block"
			position="fixed"
			top="0"
			width="100%"
			zIndex="1"
			maxW="1200px"
		>
			<Flex
				bg={useColorModeValue('white', 'gray.800')}
				color={useColorModeValue('gray.600', 'white')}
				minH="14"
				py={{ base: 2 }}
				px={{ base: 4, xl: 0 }}
				borderBottom="1"
				borderStyle="solid"
				borderColor={useColorModeValue('gray.200', 'gray.900')}
				align="center"
			>
				<Flex
					flex={{ base: 1, md: 'auto' }}
					ml={{ base: -2 }}
					display={{ base: 'flex', md: 'none' }}
				>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? (
								<FontAwesomeIcon width={3} height={3} icon={faTimes} />
							) : (
								<FontAwesomeIcon width={5} height={5} icon={faBars} />
							)
						}
						variant="ghost"
						aria-label="Toggle Navigation"
					/>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
					<Link
						as={ReactRouterLink}
						to="/"
						textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
						fontFamily="heading"
						fontSize="lg"
						fontWeight={600}
						color={useColorModeValue('gray.800', 'white')}
						_hover={{
							textDecor: 'none',
							color: useColorModeValue('gray.500', 'gray.200'),
						}}
					>
						eCommerceReact
					</Link>

					<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
						<DesktopNav navItems={NavItems} />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify="flex-end"
					direction="row"
					spacing={6}
				>
					<Tooltip label="Shopping cart" fontSize="md">
						<IconButton
							as={ReactRouterLink}
							to="/cart"
							isRound
							size="md"
							aria-label="To Shopping Cart"
							variant="ghost"
							bg="white"
							icon={
								<>
									<FontAwesomeIcon icon={faShoppingBasket} />
									{countInCart !== 0 && (
										<chakra.span
											pos="absolute"
											top="1"
											right="1"
											px={2}
											py={1}
											fontSize="xs"
											fontWeight="bold"
											lineHeight="none"
											color="red.100"
											transform="translate(50%,-50%)"
											bg="red.600"
											rounded="full"
										>
											{countInCart}
										</chakra.span>
									)}
								</>
							}
						/>
					</Tooltip>

					{isAuthenticated ? <SignoutButton /> : <SignUpModal />}
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav navItems={NavItems} />
			</Collapse>
		</Center>
	)
}

export default Header
