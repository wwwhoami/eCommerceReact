import React, { useEffect, useState } from 'react'
import {
	Button,
	Card,
	Col,
	FormControl,
	Image,
	InputGroup,
	ListGroup,
	ListGroupItem,
	Row,
	Toast,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { addToCart, itemCanBeAddedToCart } from '../reducers/cartReducer'
import {
	fetchProductById,
	getProductDetailsState,
} from '../reducers/productDetailsReducer'

interface Params {
	id: string
}

interface Props extends RouteComponentProps<Params> {}

const ProductPage = ({ match, location }: Props) => {
	const dispatch = useDispatch()
	const { product, status, error } = useSelector(getProductDetailsState)
	const canBeAddedToCart = useSelector(itemCanBeAddedToCart)(product?._id)
	const [quantity, setQuantity] = useState(1)
	const [show, setShow] = useState(false)
	const itemId = product?._id

	useEffect(() => {
		dispatch(fetchProductById(match.params.id))
	}, [dispatch, match])

	useEffect(() => {
		const quantityQuerry = Number(location.search.split('=')[1]) || 1
		setQuantity(quantityQuerry)
	}, [dispatch, location.search])

	const addToCartHandler = () => {
		if (itemId) {
			dispatch(addToCart({ itemId, quantity }))
			setShow(true)
		}
	}

	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>

			{status === 'loading' ? (
				<Loader />
			) : status === 'error' ? (
				<Message variant="danger">Error: {error?.message}</Message>
			) : typeof product !== 'undefined' ? (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid></Image>
					</Col>
					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroupItem>
								<h3>{product.name}</h3>
							</ListGroupItem>
							<ListGroupItem>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroupItem>
							<ListGroupItem>Price: ${product.price}</ListGroupItem>
							<ListGroupItem>Description: {product.description}</ListGroupItem>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroupItem>
									<Row>
										<Col>Price: </Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroupItem>

								<ListGroupItem>
									<Row>
										<Col>Status: </Col>
										<Col>
											<strong>
												{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
											</strong>
										</Col>
									</Row>
								</ListGroupItem>

								{product.countInStock > 0 && (
									<ListGroupItem>
										<Row>
											<Col md={5}>Quantity: </Col>
											<Col md={7}>
												<InputGroup hasValidation>
													<InputGroup.Prepend>
														<Button
															className="mr-1"
															variant="secondary"
															size="sm"
															onClick={() => setQuantity((prev) => prev - 1)}
															disabled={quantity <= 0}
														>
															<i className="fas fa-minus"></i>
														</Button>
													</InputGroup.Prepend>
													<FormControl
														onChange={(e) =>
															setQuantity(
																Number.parseInt(e.target.value || '0')
															)
														}
														className="text-center"
														value={quantity}
														isInvalid={
															(quantity > product.countInStock ||
																!canBeAddedToCart) &&
															quantity !== 0
														}
													></FormControl>
													<InputGroup.Append>
														<Button
															className="ml-1"
															variant="secondary"
															size="sm"
															onClick={() => setQuantity((prev) => prev + 1)}
															disabled={
																!canBeAddedToCart ||
																quantity >= product.countInStock
															}
														>
															<i className="fas fa-plus"></i>
														</Button>
													</InputGroup.Append>
													<FormControl.Feedback type="invalid">
														We don't have so many items ;(
													</FormControl.Feedback>
												</InputGroup>
											</Col>
										</Row>
									</ListGroupItem>
								)}

								<ListGroupItem>
									<Button
										onClick={addToCartHandler}
										className="btn-block"
										type="button"
										disabled={product.countInStock === 0 || quantity === 0}
									>
										Add To Cart
									</Button>
								</ListGroupItem>
							</ListGroup>
						</Card>{' '}
						<Toast
							onClose={() => setShow(false)}
							show={show}
							delay={4000}
							style={{
								position: 'fixed',
								bottom: 10,
								right: 10,
							}}
							autohide
						>
							<Toast.Header>
								<i
									style={{ color: '#4caf50' }}
									className="fas fa-cart-plus rounded mr-2"
								></i>
								<strong className="mr-auto">Cart</strong>
							</Toast.Header>
							<Toast.Body>Item added to cart!</Toast.Body>
						</Toast>
					</Col>
				</Row>
			) : (
				<Row>
					<Col>
						<h1>Product not found :(</h1>
					</Col>
				</Row>
			)}
		</>
	)
}

export default ProductPage
