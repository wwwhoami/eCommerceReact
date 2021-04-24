import React from 'react';
import { Card } from 'react-bootstrap';
import { IProduct } from '../products';
import Rating from '../components/Rating';

interface Props {
	product: IProduct;
}

const Product = ({ product }: Props) => {
	return (
		<Card className="my-3 p-3">
			<a href={`/product/${product._id}`}>
				<Card.Img src={product.image} variant="top" />
			</a>
			<Card.Body>
				<a href={`/product/${product._id}`}>
					<Card.Title as="div">
						<strong>{product.name}</strong>
					</Card.Title>
				</a>

				<Card.Text as="div">
					<Rating
						value={product.rating}
						text={`${product.numReviews} reviews`}
					/>
				</Card.Text>

				<Card.Text as="h3">${product.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;