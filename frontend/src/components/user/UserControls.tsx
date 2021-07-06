import {
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useDisclosure,
} from '@chakra-ui/react'
import {
	faList,
	faSignOutAlt,
	faUser,
	faUserEdit,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link as ReactRouterLink } from 'react-router-dom'
import { userLogout } from '../../reducers/userReducer'
import UpdateFormModal from './updateProfile/UpdateFormModal'

interface Props {}

const UserControls = (props: Props) => {
	const dispatch = useDispatch()

	const { isOpen, onOpen, onClose } = useDisclosure()

	const onSignOut = () => {
		dispatch(userLogout())
	}

	return (
		<Menu>
			<MenuButton
				as={IconButton}
				aria-label="User controls"
				isRound
				variant="solid"
				icon={<FontAwesomeIcon width={3} height={3} icon={faUser} />}
			/>
			<MenuList>
				<MenuItem
					as={ReactRouterLink}
					to="/user/order-history"
					icon={<FontAwesomeIcon width={3} height={3} icon={faList} />}
				>
					My Orders
				</MenuItem>
				<MenuItem
					onClick={onOpen}
					icon={<FontAwesomeIcon width={3} height={3} icon={faUserEdit} />}
				>
					Edit Profile
					<UpdateFormModal isOpen={isOpen} onClose={onClose} />
				</MenuItem>
				<MenuItem
					onClick={onSignOut}
					icon={<FontAwesomeIcon width={3} height={3} icon={faSignOutAlt} />}
				>
					Sign Out
				</MenuItem>
			</MenuList>
		</Menu>
	)
}

export default UserControls
