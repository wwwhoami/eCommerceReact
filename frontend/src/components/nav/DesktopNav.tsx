import {
	Box,
	Link,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import DesktopSubNav from './DesktopSubNav'
import { NavItem } from './NavItem'

interface Props {
	navItems: NavItem[]
}

const DesktopNav = ({ navItems }: Props) => {
	const linkColor = useColorModeValue('gray.600', 'gray.200')
	const linkHoverColor = useColorModeValue('gray.800', 'white')
	const popoverContentBgColor = useColorModeValue('white', 'gray.800')

	return (
		<Stack direction="row" spacing={4}>
			{navItems.map((navItem) => (
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
										<DesktopSubNav
											navItem={child}
											key={child.label}
											{...child}
										/>
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

export default DesktopNav
