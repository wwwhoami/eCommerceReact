import {
	Box,
	Flex,
	Icon,
	Link,
	Stack,
	useColorModeValue,
	Text,
} from '@chakra-ui/react'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link as ReactRouterLink } from 'react-router-dom'
import { NavItem } from './NavItem'

interface Props {
	navItem: NavItem
}

const DesktopSubNav = ({ navItem }: Props) => {
	const { label, href, subLabel } = navItem
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

export default DesktopSubNav
