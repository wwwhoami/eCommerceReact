import {
	Box,
	Button,
	chakra,
	Collapse,
	Flex,
	Icon,
	IconButton,
	Link, Popover,
	PopoverContent,
	PopoverTrigger,
	Stack,
	Text,
	Tooltip,
	useBreakpointValue,
	useColorModeValue,
	useDisclosure
} from '@chakra-ui/react'
import {
	faBars,
	faChevronDown,
	faChevronRight,
	faShoppingBasket,
	faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link as ReactRouterLink } from 'react-router-dom'
import { getCartItemsCount } from '../reducers/cartReducer'


const Header = () => {
	const countInCart = useSelector(getCartItemsCount)
	const { isOpen, onToggle } = useDisclosure()

	return (
		<>
			<Box position="fixed" top="0" width="100%" zIndex="1">
				<Flex
					bg={useColorModeValue('white', 'gray.800')}
					color={useColorModeValue('gray.600', 'white')}
					minH="14"
					py={{ base: 2 }}
					px={{ base: 4 }}
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
							<DesktopNav />
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

						<Button
							as={ReactRouterLink}
							to="/sign-in"
							fontSize="sm"
							fontWeight={400}
							variant="link"
						>
							Sign In
						</Button>
						<Button
							as={ReactRouterLink}
							to="/sign-up"
							textDecoration="none"
							display={{ base: 'none', md: 'inline-flex' }}
							fontSize="sm"
							fontWeight={600}
							color="white"
							bg="pink.400"
							_hover={{
								bg: 'pink.300',
								textDecor: 'none',
								color: 'white',
							}}
						>
							Sign Up
						</Button>
					</Stack>
				</Flex>

				<Collapse in={isOpen} animateOpacity>
					<MobileNav />
				</Collapse>
			</Box>
		</>
	)
}
const DesktopNav = () => {
	const linkColor = useColorModeValue('gray.600', 'gray.200')
	const linkHoverColor = useColorModeValue('gray.800', 'white')
	const popoverContentBgColor = useColorModeValue('white', 'gray.800')

	return (
		<Stack direction="row" spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger="hover" placement="bottom-start">
						<PopoverTrigger>
							<Link
								as={ReactRouterLink}
								p={2}
								to={navItem.href ?? '#'}
								fontSize="sm"
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: 'none',
									color: linkHoverColor,
								}}
							>
								{navItem.label}
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow="xl"
								bg={popoverContentBgColor}
								p={4}
								rounded="xl"
								minW="sm"
							>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	)
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
	return (
		<Link
			as={ReactRouterLink}
			to={href || '#'}
			role={'group'}
			display={'block'}
			p={2}
			rounded={'md'}
			_hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
		>
			<Stack direction={'row'} align={'center'}>
				<Box>
					<Text
						transition={'all .3s ease'}
						_groupHover={{ color: 'pink.400' }}
						fontWeight={500}
					>
						{label}
					</Text>
					<Text fontSize={'sm'}>{subLabel}</Text>
				</Box>
				<Flex
					transition={'all .3s ease'}
					transform={'translateX(-10px)'}
					opacity={0}
					_groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
					justify={'flex-end'}
					align={'center'}
					flex={1}
				>
					<Icon color={'pink.400'} w={5} h={5}>
						<FontAwesomeIcon icon={faChevronRight} />
					</Icon>
				</Flex>
			</Stack>
		</Link>
	)
}

const MobileNav = () => {
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.800')}
			p={4}
			display={{ md: 'none' }}
		>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	)
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
	const { isOpen, onToggle } = useDisclosure()

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={Link}
				href={href ?? '#'}
				justify="space-between"
				align="center"
				_hover={{
					textDecoration: 'none',
				}}
			>
				<Text
					fontWeight={600}
					color={useColorModeValue('gray.600', 'gray.200')}
				>
					{label}
				</Text>
				{children && (
					<Icon
						transition="all .25s ease-in-out"
						transform={isOpen ? 'rotate(180deg)' : ''}
						w={6}
						h={6}
					>
						<Icon color={'pink.400'} w={5} h={5}>
							<FontAwesomeIcon icon={faChevronDown} />
						</Icon>
					</Icon>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle="solid"
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align="start"
				>
					{children &&
						children.map((child) => (
							<Link
								as={ReactRouterLink}
								key={child.label}
								py={2}
								to={child.href || '#'}
							>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	)
}

interface NavItem {
	label: string
	subLabel?: string
	children?: Array<NavItem>
	href?: string
}

const NAV_ITEMS: Array<NavItem> = [
	{
		label: 'Category 1',
		children: [
			{
				label: 'Explore Design Work',
				subLabel: 'Trending Design to inspire you',
				href: '#',
			},
			{
				label: 'New & Noteworthy',
				subLabel: 'Up-and-coming Designers',
				href: '#',
			},
		],
	},
	{
		label: 'Category 2',
		children: [
			{
				label: 'Job Board',
				subLabel: 'Find your dream design job',
				href: '#',
			},
			{
				label: 'Freelance Projects',
				subLabel: 'An exclusive list for contract work',
				href: '#',
			},
		],
	},
	{
		label: 'Category 3',
		href: '#',
	},
	{
		label: 'Category 4',
		href: '#',
	},
]
/* <LinkContainer to="/">
						<Navbar.Brand>eCommerceReact</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<LinkContainer to="/cart">
								<Nav.Link>
									{countInCart !== 0 && (
										<Badge
											style={{ marginRight: '-6px', marginBottom: -12 }}
											variant="danger"
										>
											{countInCart}
										</Badge>
									)}
									<i className="fas fa-shopping-cart"></i> Cart
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/login">
								<Nav.Link>
									<i className="fas fa-user"></i> Sign In
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse> */

export default Header
