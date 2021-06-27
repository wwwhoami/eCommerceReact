import { Box, Icon } from '@chakra-ui/react'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface Props {
	value: number
	text: string
	color?: string
	fontSize?: string
	iconSize?: number
}

const Rating = ({
	value,
	text,
	color = 'orange',
	fontSize = 'sm',
	iconSize = 4,
}: Props) => {
	let starsJSX: Array<JSX.Element> = []
	let fullStarCount = Math.trunc(value)
	let floatPart = Number((value - fullStarCount).toFixed(2))
	let emptyStarCount = Math.floor(5 - value)

	const getFullStarJSX = () => <FontAwesomeIcon color={color} icon={faStar} />

	const getHalfStarJSX = () => (
		<FontAwesomeIcon color={color} icon={faStarHalfAlt} />
	)

	const getEmptyStarJSX = () => <FontAwesomeIcon color={color} icon={farStar} />

	while (fullStarCount--) {
		starsJSX.push(getFullStarJSX())
	}
	if (floatPart >= 0.5) {
		starsJSX.push(getHalfStarJSX())
	}
	while (emptyStarCount--) {
		starsJSX.push(getEmptyStarJSX())
	}

	return (
		<Box d="flex" alignItems="center">
			{starsJSX.map((star, index) => (
				<Icon key={index} boxSize={iconSize} color={color}>
					{star}
				</Icon>
			))}
			<Box
				as="span"
				ml="2"
				color="gray.600"
				fontSize={fontSize}
				whiteSpace="initial"
			>
				{text && text}
			</Box>
		</Box>
	)
}

export default Rating
