import {
	Box,
	Heading,
	HStack,
	IconButton,
	Text,
	Tooltip,
} from '@chakra-ui/react'
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from 'react'
import StepperContext from './Stepper'

interface Props {
	heading: string
	index?: number
	id?: string
	onClick?: () => void
}

function StepperHeaderItem({
	heading,
	index,
	children,
	id,
	onClick,
}: PropsWithChildren<Props>) {
	const { activeDisplay, setActiveDisplay, availableDisplays } =
		useContext(StepperContext)
	const [canBeActive, setCanBeActive] = useState(index!! <= availableDisplays)
	const isActive = activeDisplay === index

	useEffect(() => {
		setCanBeActive(index!! <= availableDisplays)
	}, [availableDisplays, index])

	return (
		<>
			<Box
				display={{ base: 'none', md: canBeActive ? 'block' : 'none' }}
				px={5}
				py={6}
				my={4}
				color={isActive ? 'black' : 'gray.500'}
				borderWidth="1px"
				rounded="lg"
				shadow={isActive ? 'lg' : 'none'}
				cursor={isActive ? 'default' : 'pointer'}
				bgColor="white"
				_hover={{
					bgColor: isActive ? 'white' : 'gray.200',
					color: isActive ? 'black' : 'gray.600',
				}}
				transition="ease-in 0.1s"
				id={id}
				onClick={() => {
					canBeActive && setActiveDisplay(index!!)
					onClick && onClick()
				}}
			>
				<Heading as="h2" fontSize="2xl" fontWeight="medium" lineHeight="6">
					{heading}
				</Heading>
				<Text mt={3}>{children}</Text>
			</Box>

			{/* MOBILE HEADER */}

			<HStack
				display={{
					base: isActive ? 'flex' : 'none',
					md: 'none',
				}}
				justifyContent="space-around"
				alignItems="center"
				id={id}
				onClick={() => {
					canBeActive && setActiveDisplay(index!!)
					onClick && onClick()
				}}
			>
				<Tooltip label="Go to previous step" fontSize="md">
					<IconButton
						aria-label="Go to previous step"
						visibility={index!! > 0 ? 'visible' : 'hidden'}
						onClick={() => setActiveDisplay(index!!--)}
						leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
						variant="solid"
						colorScheme="pink"
						rounded="xl"
					>
						Previous
					</IconButton>
				</Tooltip>

				<Heading as="h2" fontSize="2xl" fontWeight="medium">
					{heading}
				</Heading>

				<Tooltip label="Go to next step" fontSize="md">
					<IconButton
						aria-label="Go to next step"
						visibility={index!! < availableDisplays ? 'visible' : 'hidden'}
						onClick={() => setActiveDisplay(index!!++)}
						leftIcon={<FontAwesomeIcon icon={faChevronRight} />}
						variant="solid"
						colorScheme="pink"
						rounded="xl"
					>
						Next
					</IconButton>
				</Tooltip>
			</HStack>
		</>
	)
}

export default StepperHeaderItem
