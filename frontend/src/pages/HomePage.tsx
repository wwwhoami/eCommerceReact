import { Center, SimpleGrid, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard'
import {
	fetchProducts,
	getProductListState,
} from '../reducers/productListReducer'

const HomePage = () => {
	const dispatch = useDispatch()
	const { products, status, error } = useSelector(getProductListState)

	useEffect(() => {
		dispatch(fetchProducts())
	}, [dispatch])

	return (
		<>
			<PageHeader hasBackButton={false}>Latest Products</PageHeader>
			{status === 'loading' ? (
				<SimpleGrid
					alignItems="center"
					columns={[1, null, 2, 3, 4]}
					spacing="40px"
				>
					<Skeleton w="sm" h="385.612px"></Skeleton>
					<Skeleton w="sm" h="385.612px"></Skeleton>
					<Skeleton w="sm" h="385.612px"></Skeleton>
					<Skeleton w="sm" h="385.612px"></Skeleton>
					<Skeleton w="sm" h="385.612px"></Skeleton>
					<Skeleton w="sm" h="385.612px"></Skeleton>
					<Skeleton w="sm" h="385.612px"></Skeleton>
					<Skeleton w="sm" h="385.612px"></Skeleton>
					<Skeleton w="sm" h="385.612px"></Skeleton>
				</SimpleGrid>
			) : status === 'error' ? (
				<Message status="error">Error: {error?.message}</Message>
			) : (
				<Center>
					<SimpleGrid
						alignItems="center"
						columns={[1, null, 2, 3, 4]}
						spacingX="40px"
						spacingY="40px"
					>
						{products?.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</SimpleGrid>
				</Center>
			)}
		</>
	)
}

export default HomePage
