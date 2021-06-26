import React, { useEffect } from 'react'
import {
	Col,
	ListGroup,
	ListGroupItem,
	Row,
	Image,
	Button,
	FormControl,
	InputGroup,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import CartListItem from '../components/CartListItem'
import Message from '../components/Message'
import { addToCart, getCartItems } from '../reducers/cartReducer'

type Params = {
	id: string
}

interface Props extends RouteComponentProps<Params> {}

const CartPage = ({ match, location, history }: Props) => {
	const dispatch = useDispatch()
	const cartItems = useSelector(getCartItems)

	return (
		<>
			<Row>
				<Col md={8}>
					<h1>Shopping Cart</h1>
					{cartItems.length === 0 ? (
						<>
							<Link to="/" className="btn btn-light my-3">
								Go Back
							</Link>
							<Message>Your cart is empty</Message>
						</>
					) : (
						<ListGroup variant="flush">
							{cartItems.map((item) => (
								<CartListItem item={item} />
							))}
						</ListGroup>
					)}
				</Col>
				<Col md={2}></Col>
				<Col md={2}></Col>
			</Row>
		</>
	)
}

export default CartPage
