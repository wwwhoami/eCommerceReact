import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react'
import React from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

interface Props {
	isOpen: boolean
	onClose: () => void
}

const SignUpModal = ({ isOpen, onClose }: Props) => {
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					{/* <ModalHeader>Register new account</ModalHeader> */}
					<ModalBody pb={6}>
						<Tabs isFitted variant="solid-rounded" colorScheme="pink">
							<TabList mb="1em">
								<Tab>Sign In</Tab>
								<Tab>Sign Up</Tab>
								<ModalCloseButton ml={3} />
							</TabList>
							<TabPanels>
								<TabPanel>
									<LoginForm onClose={onClose} />
								</TabPanel>
								<TabPanel>
									<SignUpForm onClose={onClose} />
								</TabPanel>
							</TabPanels>
						</Tabs>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default SignUpModal
