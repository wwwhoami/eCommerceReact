import { Button } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../reducers/userReducer'

interface Props {}

const SignoutButton = (props: Props) => {
	const dispatch = useDispatch()

	const onSignOut = () => {
		dispatch(userLogout())
	}

	return (
		<Button fontSize="sm" fontWeight={600} onClick={onSignOut}>
			Sign Out
		</Button>
	)
}

export default SignoutButton
