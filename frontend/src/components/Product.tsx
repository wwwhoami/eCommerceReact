import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { IProduct } from '../types'
import Rating from '../components/Rating'

interface Props {
	product: IProduct
}

const Product = ({ product }: Props) => {
	return (
		<Card className="my-3 p-3">
			<Card.Img src={product.image} variant="top" />
			<Card.Body>
				<Card.Title as="div">
					<strong>{product.name}</strong>
				</Card.Title>

				<Card.Text as="div">
					<Rating
						value={product.rating}
						text={`${product.numReviews} reviews`}
					/>
				</Card.Text>

				<Card.Text as="h3">${product.price}</Card.Text>
				<Link to={`/product/${product._id}`} className="stretched-link"></Link>
			</Card.Body>
		</Card>
	)
}

export default Product
