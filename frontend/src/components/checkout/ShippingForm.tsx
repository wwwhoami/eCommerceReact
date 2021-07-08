import {
	Box,
	Button,
	FormControl,
	FormLabel,
	GridItem,
	Input,
	Select,
	SimpleGrid,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getShippingAddress,
	saveShippingAddress,
} from '../../reducers/cartReducer'
import { getUserEmail } from '../../reducers/userReducer'
import Stepper from '../stepper/Stepper'

interface Props {}

const ShippingForm = (props: Props) => {
	const dispatch = useDispatch()

	const userEmail = useSelector(getUserEmail)
	const shippingAddress = useSelector(getShippingAddress)

	const {
		setActiveDisplay,
		setAvailableDisplays,
		activeDisplay,
		availableDisplays,
	} = useContext(Stepper)

	const [email, setEmail] = useState('')
	const [country, setCountry] = useState('')
	const [state, setState] = useState('')
	const [streetAddress, setStreetAddress] = useState('')
	const [city, setCity] = useState('')
	const [postalCode, setPostalCode] = useState('')

	const onSubmit = () => {
		dispatch(
			saveShippingAddress({
				email,
				country,
				state,
				streetAddress,
				city,
				postalCode,
			})
		)
		const isLastStep = activeDisplay === availableDisplays
		isLastStep && setAvailableDisplays((prev) => prev + 1)
		setActiveDisplay((prev) => prev + 1)
	}

	useEffect(() => {
		if (userEmail) setEmail(userEmail)
	}, [userEmail])

	useEffect(() => {
		if (shippingAddress) {
			let { email, country, state, streetAddress, city, postalCode } =
				shippingAddress
			setEmail(email)
			setCountry(country)
			setState(state)
			setStreetAddress(streetAddress)
			setCity(city)
			setPostalCode(postalCode)
		}
	}, [shippingAddress])

	return (
		<>
			<Stack
				px={4}
				py={5}
				p={[null, 6]}
				bg={useColorModeValue('white', 'gray.700')}
				spacing={6}
			>
				<SimpleGrid columns={6} spacing={6}>
					<FormControl as={GridItem} colSpan={[6, 4]} isRequired>
						<FormLabel for="email">Email address</FormLabel>
						<Input
							required
							type="text"
							name="email"
							id="email"
							value={email}
							autoComplete="email"
							mt={1}
							shadow="sm"
							w="full"
							rounded="md"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>
					<FormControl as={GridItem} colSpan={[6, 3]} isRequired>
						<FormLabel for="country">Country / Region</FormLabel>
						<Select
							id="country"
							name="country"
							value={country}
							autoComplete="country"
							placeholder="Select option"
							mt={1}
							shadow="sm"
							w="full"
							rounded="md"
							onChange={(e) => setCountry(e.target.value)}
						>
							<option>United States</option>
							<option>Canada</option>
							<option>Mexico</option>
						</Select>
					</FormControl>
					<FormControl as={GridItem} colSpan={6} isRequired>
						<FormLabel for="streetAddress">Street address</FormLabel>
						<Input
							type="text"
							name="streetAddress"
							id="streetAddress"
							value={streetAddress}
							autoComplete="street-address"
							mt={1}
							shadow="sm"
							w="full"
							rounded="md"
							onChange={(e) => setStreetAddress(e.target.value)}
						/>
					</FormControl>
					<FormControl as={GridItem} colSpan={[6, 6, null, 2]} isRequired>
						<FormLabel for="city">City</FormLabel>
						<Input
							type="text"
							name="city"
							id="city"
							value={city}
							autoComplete="city"
							mt={1}
							shadow="sm"
							w="full"
							rounded="md"
							onChange={(e) => setCity(e.target.value)}
						/>
					</FormControl>
					<FormControl as={GridItem} colSpan={[6, 3, null, 2]} isRequired>
						<FormLabel for="state">State / Province</FormLabel>
						<Input
							type="text"
							name="state"
							id="state"
							value={state}
							autoComplete="state"
							mt={1}
							shadow="sm"
							w="full"
							rounded="md"
							onChange={(e) => setState(e.target.value)}
						/>
					</FormControl>
					<FormControl as={GridItem} colSpan={[6, 3, null, 2]} isRequired>
						<FormLabel for="postalCode">ZIP / Postal</FormLabel>
						<Input
							type="text"
							name="postalCode"
							id="postalCode"
							value={postalCode}
							autoComplete="postal-code"
							mt={1}
							shadow="sm"
							w="full"
							rounded="md"
							onChange={(e) => setPostalCode(e.target.value)}
						/>
					</FormControl>
				</SimpleGrid>
			</Stack>
			<Box px={{ base: 4, sm: 6 }} py={3}>
				<Button
					type="submit"
					colorScheme="pink"
					w="20%"
					isDisabled={
						!email ||
						!country ||
						!state ||
						!streetAddress ||
						!city ||
						!postalCode
					}
					onClick={onSubmit}
				>
					Save
				</Button>
			</Box>
		</>
	)
}

export default ShippingForm
