import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Skeleton,
	useToast,
	Text,
} from '@chakra-ui/react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getErrorMessage,
	getStatus,
	getUserData,
	updateUserData,
} from '../../reducers/userReducer'
import {
	validateEmail,
	validatePasswordConfirmNotReq,
	validateUsername,
} from './inputValidator'

interface Props {}

const UpdateForm = (props: Props) => {
	const dispatch = useDispatch()

	const status = useSelector(getStatus)
	const signUpErrorMessage = useSelector(getErrorMessage)
	const userData = useSelector(getUserData)

	const [newUsername, setNewUsername] = useState(userData?.username || 'lol')
	const [newUsernameError, setNewUsernameError] = useState('')
	let newUsernameIsInvalid = !!newUsernameError

	const [newEmail, setNewEmail] = useState(userData?.email || '')
	const [newEmailError, setNewEmailError] = useState('')
	let newEmailIsInvalid = !!newEmailError

	const [newPassword, setNewPassword] = useState('')

	const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
	const [newPasswordConfirmError, setNewPasswordConfirmError] = useState('')
	let newPasswordConfirmIsInvalid = !!newPasswordConfirmError

	const toast = useToast()

	const [showPassword, setShowPassword] = useState(false)

	const onSubmit = () => {
		if (
			!newUsernameIsInvalid &&
			!newEmailIsInvalid &&
			!newPasswordConfirmIsInvalid
		)
			dispatch(
				updateUserData({
					username: newUsername,
					email: newEmail,
					password: newPassword,
				})
			)
	}

	useEffect(() => {
		if (status === 'updated') {
			toast({
				title: 'Account info updated.',
				description: "We've updated account data for you.",
				status: 'success',
				duration: 3000,
				isClosable: true,
			})
		}
	}, [status, toast])

	useEffect(() => {
		if (userData) {
			const { username, email } = userData
			setNewUsername(username || '')
			setNewEmail(email || '')
		}
	}, [userData])

	useEffect(() => {
		if (signUpErrorMessage?.includes('email')) {
			setNewEmailError(signUpErrorMessage)
		} else if (signUpErrorMessage?.includes('name')) {
			setNewUsernameError(signUpErrorMessage)
		}
	}, [signUpErrorMessage])

	useEffect(() => {
		setNewPasswordConfirmError(
			validatePasswordConfirmNotReq(newPassword, newPasswordConfirm)
		)
	}, [newPassword, newPasswordConfirm])

	return (
		<>
			<Text fontSize="3xl" fontWeight={500} mb={4}>
				Update user data
			</Text>
			<Skeleton isLoaded={status !== 'loading'}>
				<FormControl isInvalid={newUsernameIsInvalid}>
					<FormLabel>New username</FormLabel>
					<Input
						placeholder="Username"
						type="text"
						value={newUsername}
						onChange={(e) => {
							setNewUsername(e.target.value)
						}}
						onBlur={() => setNewUsernameError(validateUsername(newUsername))}
					/>
					<FormErrorMessage>{newUsernameError}</FormErrorMessage>
				</FormControl>
			</Skeleton>
			<Skeleton isLoaded={status !== 'loading'}>
				<FormControl isInvalid={newEmailIsInvalid} mt={4}>
					<FormLabel>New email</FormLabel>
					<Input
						placeholder="Email"
						type="email"
						value={newEmail}
						onChange={(e) => {
							setNewEmail(e.target.value)
						}}
						onBlur={() => setNewEmailError(validateEmail(newEmail))}
					/>
					<FormErrorMessage>{newEmailError}</FormErrorMessage>
				</FormControl>
			</Skeleton>
			<Skeleton isLoaded={status !== 'loading'}>
				<FormControl mt={4}>
					<FormLabel>New password</FormLabel>

					<InputGroup>
						<Input
							placeholder="Password"
							type={showPassword ? 'text' : 'password'}
							onChange={(e) => {
								setNewPassword(e.target.value)
							}}
						/>
						<InputRightElement>
							<IconButton
								aria-label="Show password"
								size="sm"
								onClick={() => setShowPassword(!showPassword)}
								rounded="full"
								icon={
									<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
								}
							></IconButton>
						</InputRightElement>
					</InputGroup>
				</FormControl>
			</Skeleton>
			<Skeleton isLoaded={status !== 'loading'}>
				<FormControl isInvalid={newPasswordConfirmIsInvalid} mt={4}>
					<FormLabel>New password confirmation</FormLabel>
					<Input
						placeholder="Password"
						type={showPassword ? 'text' : 'password'}
						onChange={(e) => {
							setNewPasswordConfirm(e.target.value)
						}}
						onBlur={() =>
							setNewPasswordConfirmError(
								validatePasswordConfirmNotReq(newPassword, newPasswordConfirm)
							)
						}
					/>
					<FormErrorMessage>{newPasswordConfirmError}</FormErrorMessage>
				</FormControl>
			</Skeleton>
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
				isDisabled={
					userData?.username === newUsername &&
					userData?.email === newEmail &&
					!newPassword
				}
			>
				Update
			</Button>
		</>
	)
}

export default UpdateForm
