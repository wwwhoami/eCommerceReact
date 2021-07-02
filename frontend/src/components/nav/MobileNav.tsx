import { Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import MobileNavItem from './MobileNavItem'
import { NavItem } from './NavItem'

interface Props {
	navItems: NavItem[]
}

const MobileNav = ({ navItems }: Props) => {
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.800')}
			p={4}
			display={{ md: 'none' }}
		>
			{navItems.map((navItem) => (
				<MobileNavItem navItem={navItem} key={navItem.label} {...navItem} />
			))}
		</Stack>
	)
}

export default MobileNav
