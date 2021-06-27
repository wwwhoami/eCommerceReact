import { Button } from '@chakra-ui/react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

interface Props {}

const BackButton = (props: Props) => {
	return (
		<Button
			as={ReactRouterLink}
			to="/"
			leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
			variant="solid"
			_hover={{
				textDecor: 'none',
			}}
		>
			Back
		</Button>
	)
}

export default BackButton
