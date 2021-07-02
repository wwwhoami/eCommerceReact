import { Button } from '@chakra-ui/react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useHistory } from 'react-router-dom'

interface Props {}

const BackButton = (props: Props) => {
	const history = useHistory()

	return (
		<Button
			onClick={history.goBack}
			leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
			variant="solid"
		>
			Back
		</Button>
	)
}

export default BackButton
