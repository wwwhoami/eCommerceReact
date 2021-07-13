import { Button } from '@chakra-ui/react'
import React from 'react'

interface Props {
    onOpen: () => void
}

const SignUpButton = ({ onOpen }: Props) => {
	return (
		<Button
			fontSize="sm"
			fontWeight={600}
			color="white"
			bg="pink.400"
			_hover={{
				bg: 'pink.300',
				color: 'white',
			}}
			onClick={onOpen}
		>
			Sign Up
		</Button>
	)
}

export default SignUpButton
