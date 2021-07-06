import React, {
	createContext,
	PropsWithChildren,
	useEffect,
	useState,
} from 'react'

interface Props {}

interface IStepperContext {
	activeDisplay: number
	setActiveDisplay: React.Dispatch<React.SetStateAction<number>>
	availableDisplays: number
	setAvailableDisplays: React.Dispatch<React.SetStateAction<number>>
}

const StepperContext = createContext<IStepperContext>({
	activeDisplay: 0,
	setActiveDisplay: (activeDisplay) =>
		console.warn('No activeDisplay provider'),
	availableDisplays: 0,
	setAvailableDisplays: (availableDisplay) =>
		console.warn('No setAvailableDisplay provider'),
})

const Stepper = ({ children }: PropsWithChildren<Props>) => {
	const [activeDisplay, setActiveDisplay] = useState(0)
	const [availableDisplays, setAvailableDisplays] = useState(activeDisplay)

	useEffect(() => {
		if (availableDisplays < activeDisplay) setActiveDisplay(activeDisplay)
	}, [activeDisplay, availableDisplays])

	return (
		<>
			<StepperContext.Provider
				value={{
					activeDisplay,
					setActiveDisplay,
					availableDisplays,
					setAvailableDisplays,
				}}
			>
				{children}
			</StepperContext.Provider>
		</>
	)
}

export { StepperContext as default, Stepper }
