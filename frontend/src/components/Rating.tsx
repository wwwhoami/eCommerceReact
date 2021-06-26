import React from 'react'

interface Props {
	value: number
	text: string
	color?: string
}

const Rating = ({ value, text, color = 'orange' }: Props) => {
	let starsJSX: Array<JSX.Element> = []
	let fullStarCount = Math.trunc(value)
	let floatPart = Number((value - fullStarCount).toFixed(2))
	let emptyStarCount = Math.floor(5 - value)

	const getFullStarJSX = () => <i style={{ color }} className="fas fa-star"></i>

	const getHalfStarJSX = () => (
		<i style={{ color }} className="fas fa-star-half-alt"></i>
	)

	const getEmptyStarJSX = () => (
		<i style={{ color }} className="far fa-star"></i>
	)

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
		<div className="rating">
			{starsJSX.map((star, index) => (
				<span key={index}>{star}</span>
			))}
			<span>{text && text}</span>
		</div>
	)
}

export default Rating
