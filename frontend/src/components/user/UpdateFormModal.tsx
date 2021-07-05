import {
    Modal, ModalBody,
    ModalCloseButton, ModalContent,
    ModalHeader, ModalOverlay
} from '@chakra-ui/react'
import UpdateForm from './UpdateForm'

interface Props {
	isOpen: boolean
	onClose: () => void
}

const UpdateFormModal = ({ isOpen, onClose }: Props) => {
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit account info</ModalHeader>
					<ModalCloseButton ml={3} />
					<ModalBody pb={6}>
						<UpdateForm onClose={onClose} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default UpdateFormModal
