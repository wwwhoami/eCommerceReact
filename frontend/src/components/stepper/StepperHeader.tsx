import { Stack } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

interface Props {}

function StepperHeader({ children }: PropsWithChildren<Props>) {
	return (
		<Stack flexDir={['row', null, 'column']}>
			{React.Children.map(children, (child, index) =>
				React.cloneElement(child as React.ReactElement<any>, { index })
			)}
		</Stack>
	)
}

export default StepperHeader
