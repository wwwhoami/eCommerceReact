import {
	Box,
	Button,
	chakra,
	Heading,
	Radio,
	RadioGroup,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPaymentMethod, savePaymentMethod } from '../../reducers/cartReducer'
import { PaymentMethod } from '../../types'
import Stepper from '../stepper/Stepper'

interface Props {}

const PaymentForm = (props: Props) => {
	const dispatch = useDispatch()

	const savedPaymentMethod = useSelector(getPaymentMethod)

	const {
		setActiveDisplay,
		setAvailableDisplays,
		activeDisplay,
		availableDisplays,
	} = useContext(Stepper)

	const [paymentMethod, setPaymentMethod] = useState('')

	const onSubmit = () => {
		dispatch(savePaymentMethod(paymentMethod as unknown as PaymentMethod))
		const isLastStep = activeDisplay === availableDisplays
		isLastStep && setAvailableDisplays((prev) => prev + 1)
		setActiveDisplay((prev) => prev + 1)
	}

	useEffect(() => {
		if (savedPaymentMethod) {
			setPaymentMethod(savedPaymentMethod)
		}
	}, [savedPaymentMethod])

	return (
		<>
			<Stack px={4} py={5} p={[null, 6]} bg="white" spacing={6}>
				<chakra.fieldset>
					<Box as="legend" color={useColorModeValue('gray.900', 'gray.50')}>
						<Heading as="h3" fontSize="xl">
							Payment method
						</Heading>
						<Text color={useColorModeValue('gray.500', 'gray.400')}>
							Select payment method you prefer
						</Text>
					</Box>
					<RadioGroup
						colorScheme="pink"
						mt={4}
						onChange={setPaymentMethod}
						defaultValue={savedPaymentMethod}
					>
						<Stack spacing={4}>
							<Radio spacing={3} value="PayPal">
								PayPal
							</Radio>
							<Radio spacing={3} value="Stripe">
								Stripe
							</Radio>
						</Stack>
					</RadioGroup>
				</chakra.fieldset>
			</Stack>
			<Box px={{ base: 4, sm: 6 }} py={3}>
				<Button
					type="submit"
					colorScheme="pink"
					w="20%"
					isDisabled={!paymentMethod}
					onClick={onSubmit}
				>
					Save
				</Button>
			</Box>
		</>
	)
}
export default PaymentForm
