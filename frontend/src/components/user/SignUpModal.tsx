import {
	Button,
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
	useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

interface Props {}

const SignUpModal = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
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
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					{/* <ModalHeader>Register new account</ModalHeader> */}
					<ModalBody pb={6}>
						<Tabs isFitted variant="solid-rounded" colorScheme="pink">
							<TabList mb="1em">
								<Tab>Sign in</Tab>
								<Tab>Sign up</Tab>
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
