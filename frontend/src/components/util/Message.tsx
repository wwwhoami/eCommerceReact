import React from 'react'
import { Alert, AlertIcon } from '@chakra-ui/react'
interface Props {
	status?: 'info' | 'warning' | 'success' | 'error' | undefined
	children: React.ReactNode | React.ReactNode[]
}

const Message = ({ status = 'info', children }: Props) => {
	return (
		<Alert status={status} fontSize="2xl">
			<AlertIcon boxSize="30px" />
			{children}
		</Alert>
	)
}

export default Message
