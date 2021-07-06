import { Heading, HStack } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import BackButton from './BackButton'

interface Props {
	hasBackButton?: boolean
}

const PageHeader = ({
	children,
	hasBackButton = true,
}: PropsWithChildren<Props>) => {
	return (
		<HStack spacing={20} my={4}>
			{hasBackButton && <BackButton />}
			<Heading as="h1" fontSize="4xl" fontWeight={600}>
				{children}
			</Heading>
		</HStack>
	)
}

export default PageHeader
