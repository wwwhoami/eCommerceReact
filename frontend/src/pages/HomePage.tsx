import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import {
	fetchProducts,
	getProductListState,
} from '../reducers/productListReducer'

const HomePage = () => {
	// const [products, setProducts] = useState<IProduct[]>([])
	const dispatch = useDispatch()
	const { products, status, error } = useSelector(getProductListState)

	useEffect(() => {
		dispatch(fetchProducts())
	}, [dispatch])

	return (
		<div>
			<h1>Latest Products</h1>
			{status === 'loading' ? (
				<Loader />
			) : status === 'error' ? (
				<Message variant="danger">Error: {error?.message}</Message>
			) : (
				<Row>
					{products?.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</div>
	)
}

export default HomePage
