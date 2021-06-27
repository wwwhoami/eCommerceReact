import { Box, Image, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { IProduct } from '../types'
import Rating from './Rating'

interface Props {
	product: IProduct
}

const ProductCard = ({ product }: Props) => {
	return (
		<Box
			bg={useColorModeValue('white', 'gray.800')}
			maxW="sm"
			borderWidth="1px"
			rounded="lg"
			shadow="lg"
			position="relative"
			_hover={{
				bg: useColorModeValue('gray.200', 'gray.700'),
			}}
			transition=".2s ease-in"
		>
			<Image src={product.image} alt={`Picture of ${product.name}`} />
			<Box p="6">
				<Box
					as="h4"
					fontSize="xl"
					fontWeight="semibold"
					lineHeight="tight"
					isTruncated
				>
					{product.name}
				</Box>

				<Rating value={product.rating} text={`${product.numReviews} reviews`} />

				<Box fontSize="xl" color={useColorModeValue('gray.800', 'white')}>
					${product.price}
				</Box>
				<Link to={`/product/${product._id}`} className="stretched-link"></Link>
			</Box>
		</Box>
	)
}

export default ProductCard
