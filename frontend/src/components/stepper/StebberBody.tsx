import React, { PropsWithChildren, useContext } from 'react'
import StepperContext from './Stepper'

interface Props {}

const StepperBody = ({ children }: PropsWithChildren<Props>) => {
	const { activeDisplay } = useContext(StepperContext)

	return (
		<React.Fragment>
			{React.Children.toArray(children)[activeDisplay]}
		</React.Fragment>
	)
}

export default StepperBody
