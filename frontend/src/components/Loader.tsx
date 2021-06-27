import React from 'react'
import { Spinner, Center, Text } from '@chakra-ui/react'

const Loader = () => {
	return (
		<Center my="70" flexDirection="column">
			<Spinner w="100px" h="100px" m="20"></Spinner>
			<Text fontSize="lg" fontWeight={600} as="span">
				Loading...
			</Text>
		</Center>
	)
}

export default Loader
