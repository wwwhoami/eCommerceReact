import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	useToast
} from '@chakra-ui/react'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getErrorMessage,
	getStatus,
	userSignUp
} from '../../reducers/userReducer'
import {
	validateEmail,
	validatePassword,
	validatePasswordConfirm,
	validateUsername
} from './inputValidator'

interface Props {
	onClose: () => void
}

const SignUpForm = ({ onClose }: Props) => {
	const dispatch = useDispatch()
	const status = useSelector(getStatus)
	const signUpErrorMessage = useSelector(getErrorMessage)

	const [username, setUsername] = useState('')
	const [usernameError, setUsernameError] = useState('')
	let usernameIsInvalid = !!usernameError

	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState('')
	let emailIsInvalid = !!emailError

	const [password, setPassword] = useState('')
	const [passwordError, setPasswordError] = useState('')
	let passwordIsInvalid = !!passwordError

	const [passwordConfirm, setPasswordConfirm] = useState('')
	const [passwordConfirmError, setPasswordConfirmError] = useState('')
	let passwordConfirmIsInvalid = !!passwordConfirmError

	const toast = useToast()

	const [showPassword, setShowPassword] = React.useState(false)

	const onSubmit = () => {
		if (
			!usernameIsInvalid &&
			!emailIsInvalid &&
			!passwordIsInvalid &&
			!passwordConfirmIsInvalid
		)
			dispatch(userSignUp({ username, email, password, passwordConfirm }))
	}

	useEffect(() => {
		if (status === 'created') {
			toast({
				title: 'Account created.',
				description: "We've created your account for you.",
				status: 'success',
				duration: 3000,
				isClosable: true,
			})
			onClose()
		}
	}, [onClose, status, toast])

	useEffect(() => {
		if (signUpErrorMessage?.includes('email')) {
			setEmailError(signUpErrorMessage)
		} else if (signUpErrorMessage?.includes('name')) {
			setUsernameError(signUpErrorMessage)
		}
	}, [signUpErrorMessage])

	return (
		<>
			<FormControl isInvalid={usernameIsInvalid}>
				<FormLabel>Username</FormLabel>
				<Input
					placeholder="Username"
					type="text"
					onChange={(e) => {
						setUsername(e.target.value)
					}}
					onBlur={() => setUsernameError(validateUsername(username))}
				/>
				<FormErrorMessage>{usernameError}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={emailIsInvalid} mt={4}>
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
			<FormControl isInvalid={passwordIsInvalid} mt={4}>
				<FormLabel>Password</FormLabel>

				<InputGroup>
					<Input
						placeholder="Password"
						type={showPassword ? 'text' : 'password'}
						onChange={(e) => {
							setPassword(e.target.value)
						}}
						onBlur={() => setPasswordError(validatePassword(password))}
					/>
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
			<FormControl isInvalid={passwordConfirmIsInvalid} mt={4}>
				<FormLabel>Password confirmation</FormLabel>
				<Input
					placeholder="Password"
					type={showPassword ? 'text' : 'password'}
					onChange={(e) => {
						setPasswordConfirm(e.target.value)
					}}
					onBlur={() =>
						setPasswordConfirmError(
							validatePasswordConfirm(password, passwordConfirm)
						)
					}
				/>
				<FormErrorMessage>{passwordConfirmError}</FormErrorMessage>
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
				isDisabled={!username && !email && !password && !passwordConfirm}
			>
				Sign un
			</Button>
		</>
	)
}

export default SignUpForm
