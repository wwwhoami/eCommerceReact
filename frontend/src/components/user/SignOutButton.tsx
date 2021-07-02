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
		<Button
			display={{ base: 'none', md: 'inline-flex' }}
			fontSize="sm"
			fontWeight={600}
			// color="white"
			// bg="pink.400"
			// _hover={{
			// 	bg: 'pink.300',
			// 	color: 'white',
			// }}
			onClick={onSignOut}
		>
			Sign Out
		</Button>
	)
}

export default SignoutButton
