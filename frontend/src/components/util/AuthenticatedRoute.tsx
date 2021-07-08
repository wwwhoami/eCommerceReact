import React, { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { getAccessToken } from '../../reducers/userReducer'

interface Props {
	component?: React.ComponentType<any>
	[x: string]: any
}

const AuthenticatedRoute = ({
	children,
	component,
	...rest
}: PropsWithChildren<Props>) => {
	const isAuthenticated = useSelector(getAccessToken)
	return isAuthenticated ? (
		<Route {...rest} component={component} />
	) : (
		<Redirect to="/" />
	)
}

export default AuthenticatedRoute
