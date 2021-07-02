import {
	Collapse,
	Flex,
	Icon,
	Link,
	Stack,
	Text,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link as ReactRouterLink } from 'react-router-dom'
import { NavItem } from './NavItem'

interface Props {
	navItem: NavItem
}

const MobileNavItem = ({ navItem }: Props) => {
	const { label, href, children } = navItem

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

export default MobileNavItem
