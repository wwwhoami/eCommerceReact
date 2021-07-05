import {
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react'
import {
	faSignOutAlt,
	faUser,
	faUserCog,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link as ReactRouterLink } from 'react-router-dom'
import { userLogout } from '../../reducers/userReducer'

interface Props {}

const UserControls = (props: Props) => {
	const dispatch = useDispatch()

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
					to="/user"
					icon={<FontAwesomeIcon width={3} height={3} icon={faUserCog} />}
				>
					User Data
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
