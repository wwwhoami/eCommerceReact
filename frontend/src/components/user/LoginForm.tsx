import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStatus, userLogin } from '../../reducers/userReducer'
import { validateEmail, validatePassword } from './inputValidator'

interface Props {
	onClose: () => void
}

const LoginForm = ({ onClose }: Props) => {
	const dispatch = useDispatch()
	const status = useSelector(getStatus)

	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState('')
	let emailIsInvalid = !!emailError

	const [password, setPassword] = useState('')
	const [passwordError, setPasswordError] = useState('')
	let passwordIsInvalid = !!passwordError

	const [showPassword, setShowPassword] = React.useState(false)

	const onSubmit = () => {
		if (!emailIsInvalid && !passwordIsInvalid)
			dispatch(userLogin({ email, password }))
	}

	useEffect(() => {
		if (status === 'finished') onClose()
		else if (status === 'login error') {
			setEmailError('Invalid email or password!')
			setPasswordError('Invalid email or password!')
		}
	}, [onClose, status])

	return (
		<>
			<FormControl isInvalid={emailIsInvalid}>
				<FormLabel>Email</FormLabel>
				<Input
					placeholder="Email"
					type="email"
					onChange={(e) => {
						setEmail(e.target.value)
					}}
					onBlur={() => setEmailError(validateEmail(email))}
				/>
				<FormErrorMessage>{emailError}</FormErrorMessage>
			</FormControl>
			<FormControl mt={4} isInvalid={passwordIsInvalid}>
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input
						placeholder="Password"
						type={showPassword ? 'text' : 'password'}
						onChange={(e) => {
							setPassword(e.target.value)
						}}
						onBlur={() => setPasswordError(validatePassword(password))}
					/>{' '}
					<InputRightElement>
						<IconButton
							aria-label="Show password"
							size="sm"
							onClick={() => setShowPassword(!showPassword)}
							rounded="full"
							icon={
								<FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
							}
						></IconButton>
					</InputRightElement>
				</InputGroup>
				<FormErrorMessage>{passwordError}</FormErrorMessage>
			</FormControl>

			<Button
				type="submit"
				bg="pink.400"
				color="white"
				_hover={{
					bg: 'pink.300',
					color: 'white',
				}}
				mr={3}
				mt={4}
				isLoading={status === 'loading'}
				onClick={onSubmit}
				isDisabled={!email && !password}
			>
				Sign in
			</Button>
		</>
	)
}

export default LoginForm
