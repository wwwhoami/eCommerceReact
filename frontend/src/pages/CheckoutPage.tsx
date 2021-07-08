import { Box, GridItem, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import CheckoutSummary from '../components/checkout/CheckoutSummary'
import PaymentForm from '../components/checkout/PaymentForm'
import ShippingForm from '../components/checkout/ShippingForm'
import StepperBody from '../components/stepper/StebberBody'
import { Stepper } from '../components/stepper/Stepper'
import StepperHeader from '../components/stepper/StepperHeader'
import StepperHeaderItem from '../components/stepper/StepperHeaderItem'
import PageHeader from '../components/util/PageHeader'

interface Props {}

const CheckoutPage = (props: Props) => {
	return (
		<>
			<PageHeader>Checkout</PageHeader>

			<Box mt={[10, 4]}>
				<SimpleGrid
					display={{ base: 'initial', md: 'grid' }}
					columns={{ md: 3 }}
					spacing={{ md: 6 }}
				>
					<Stepper>
						<GridItem colSpan={{ md: 1 }}>
							<StepperHeader>
								<StepperHeaderItem heading="Personal Information">
									Use a permanent address where you can receive mail.
								</StepperHeaderItem>
								<StepperHeaderItem heading="Payment Method">
									Select payment method you prefer
								</StepperHeaderItem>
								<StepperHeaderItem heading="Place Order">
									Order Summary
								</StepperHeaderItem>
							</StepperHeader>
						</GridItem>
						<GridItem
							mt={[5, null, 0]}
							colSpan={{ md: 2 }}
							borderWidth="1px"
							rounded="lg"
							shadow="lg"
							bgColor="gray.50"
							h="fit-content"
						>
							<StepperBody>
								<ShippingForm />
								<PaymentForm />
								<CheckoutSummary />
							</StepperBody>
						</GridItem>
					</Stepper>
				</SimpleGrid>
			</Box>
		</>
	)
}

export default CheckoutPage
