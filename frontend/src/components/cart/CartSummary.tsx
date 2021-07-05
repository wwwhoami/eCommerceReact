import {
	Stack,
	StackDivider,
	HStack,
	Button,
	useBreakpointValue,
	Text,
} from '@chakra-ui/react'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link as ReactRouterLink } from 'react-router-dom'
import React from 'react'

interface Props {
	totalItemQty: number
	totalCost: string
}

const CartSummary = ({ totalItemQty, totalCost }: Props) => {
	const isMdDisplay = useBreakpointValue({ base: false, md: true })

	return (
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
				variant="solid"
				w={{ base: '40%', md: 'auto' }}
				leftIcon={<FontAwesomeIcon icon={faCartArrowDown} />}
			>
				To checkout
			</Button>
		</Stack>
	)
}

export default CartSummary
