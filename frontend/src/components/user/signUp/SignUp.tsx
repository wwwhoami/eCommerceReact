import { useDisclosure } from '@chakra-ui/react'
import React from 'react'
import SignUpButton from './SignUpButton'
import SignUpModal from './SignUpModal'

interface Props {
	useDisclosureProps?: {
		isOpen?: boolean
		onOpen?: () => void
		onClose?: () => void
	}
}

const SignUp = ({ useDisclosureProps }: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure(useDisclosureProps)
	return (
		<>
			<SignUpButton onOpen={onOpen} />
			<SignUpModal isOpen={isOpen} onClose={onClose} />
		</>
	)
}

export default SignUp
