import { Box } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

interface Props {}

function StepperHeader({ children }: PropsWithChildren<Props>) {
	return (
		<Box position="sticky" top={{ base: '60px', lg: '80px' }}>
			{React.Children.map(children, (child, index) =>
				React.cloneElement(child as React.ReactElement<any>, { index })
			)}
		</Box>
	)
}

export default StepperHeader
