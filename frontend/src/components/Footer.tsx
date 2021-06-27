import {
	Box,
	Container,
	Stack,
	useColorModeValue,
	Text,
} from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
	return (
		<Box
			borderTopWidth={1}
			borderStyle={'solid'}
			borderColor={useColorModeValue('gray.200', 'gray.700')}
		>
			<Container
				as={Stack}
				maxW={'6xl'}
				py={4}
				direction={{ base: 'column', md: 'row' }}
				spacing={4}
				justify={{ md: 'space-between' }}
				align={{ md: 'center' }}
			>
				<Text>2021 ©eCommerceReact</Text>
			</Container>
		</Box>
	)
}

export default Footer
