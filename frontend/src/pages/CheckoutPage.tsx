import { Box, GridItem, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import CheckoutForm from '../components/checkout/CheckoutForm'
import StepperBody from '../components/stepper/StebberBody'
import { Stepper } from '../components/stepper/Stepper'
import StepperHeader from '../components/stepper/StepperHeader'
import StepperHeaderItem from '../components/stepper/StepperHeaderItem'
import PageHeader from '../components/util/PageHeader'
import UserPage from './UserPage'

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
								<StepperHeaderItem heading="Second Information">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
								</StepperHeaderItem>
							</StepperHeader>
						</GridItem>
						<StepperBody>
							<CheckoutForm />
							<UserPage />
						</StepperBody>
					</Stepper>
				</SimpleGrid>
			</Box>
		</>
	)
}

export default CheckoutPage
