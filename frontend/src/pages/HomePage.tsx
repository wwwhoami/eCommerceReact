import { Center, SimpleGrid, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/product/ProductCard'
import Message from '../components/util/Message'
import PageHeader from '../components/util/PageHeader'
import {
	getProductListState,
	fetchProducts,
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
