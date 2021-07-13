import { useDisclosure } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { Route, useHistory } from 'react-router-dom'
import { isLoggedIn } from '../../reducers/userReducer'
import SignUpModal from '../user/signUp/SignUpModal'

interface Props {
	component?: React.ComponentType<any>
	[x: string]: any
}

const AuthenticatedRoute = ({
	children,
	component,
	...rest
}: PropsWithChildren<Props>) => {
	const isLogged = useSelector(isLoggedIn)
	const { onClose } = useDisclosure()
	const history = useHistory()

	return isLogged ? (
		<Route {...rest} component={component} />
	) : (
		<Route
			render={() => (
				<SignUpModal
					isOpen={true}
					onClose={() => {
						onClose()
						history.goBack()
					}}
				/>
			)}
		/>
	)
}

export default AuthenticatedRoute
