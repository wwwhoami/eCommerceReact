import {
	Box,
	Image,
	LinkBox,
	useColorModeValue,
	Text,
	LinkOverlay,
} from '@chakra-ui/react'
import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { IProduct } from '../../types'
import Rating from '../util/Rating'

interface Props {
	product: IProduct
}

const ProductCard = ({ product }: Props) => {
	return (
		<LinkBox
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
			<Image
				src={product.image}
				alt={`Picture of ${product.name}`}
				fit="cover"
			/>
			<Box p="6" overflow="hidden">
				<LinkOverlay
					as={ReactRouterLink}
					to={`/product/${product.id}`}
					my={2}
					fontSize="xl"
					fontWeight="semibold"
					lineHeight="tight"
					overflow="hidden"
					textOverflow="eclipsis"
					whiteSpace="nowrap"
					display="block"
					isTruncated
				>
					{product.name}
				</LinkOverlay>

				<Rating value={product.rating} text={`${product.numReviews} reviews`} />

				<Text
					my={2}
					fontSize="xl"
					color={useColorModeValue('gray.800', 'white')}
				>
					${product.price}
				</Text>
				{/* <Link to={`/product/${product._id}`} className="stretched-link"></Link> */}
			</Box>
		</LinkBox>
	)
}

export default ProductCard
