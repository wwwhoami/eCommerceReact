import React, { useEffect, useState } from 'react'
import {
	Button,
	Col,
	FormControl,
	Image,
	InputGroup,
	ListGroupItem,
	Row,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	itemCanBeAddedToCart,
	removeCartItem,
	setCartItemQuantity,
} from '../reducers/cartReducer'
import { CartItem } from '../types'

interface Props {
	item: CartItem
}

const CartListItem = ({ item }: Props) => {
	const [quantity, setQuantity] = useState(item.quantity)
	const dispatch = useDispatch()
	const canBeAddedToCart = useSelector(itemCanBeAddedToCart)(item._id)

	const removeFromCartHandler = (id: string) => {
		dispatch(removeCartItem(id))
	}

	useEffect(() => {
		if (canBeAddedToCart)
			dispatch(setCartItemQuantity({ _id: item._id, quantity }))
	}, [quantity, dispatch, item._id, canBeAddedToCart])

	return (
		<ListGroupItem key={item._id}>
			<Row>
				<Col md={2}>
					<Image src={item.image} alt={item.name} fluid rounded></Image>
				</Col>
				<Col md={3}>
					<Link to={`/product/${item._id}`}>{item.name}</Link>
				</Col>
				<Col md={2}>${item.price}</Col>
				<Col md={2}>
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
								setQuantity(Number.parseInt(e.target.value || '0'))
							}
							className="text-center"
							value={quantity}
							isInvalid={
								(quantity > item.countInStock || !canBeAddedToCart) &&
								quantity !== 0
							}
						></FormControl>
						<InputGroup.Append>
							<Button
								className="ml-1"
								variant="secondary"
								size="sm"
								onClick={() => setQuantity((prev) => prev + 1)}
								disabled={!canBeAddedToCart || quantity >= item.countInStock}
							>
								<i className="fas fa-plus"></i>
							</Button>
						</InputGroup.Append>
						<FormControl.Feedback type="invalid">
							We don't have so many items ;(
						</FormControl.Feedback>
					</InputGroup>
				</Col>
				<Col md={2}>
					<Button
						type="button"
						variant="outline-danger"
						onClick={() => removeFromCartHandler(item._id)}
					>
						<i className="fas fa-trash"></i>
					</Button>{' '}
				</Col>
			</Row>
		</ListGroupItem>
	)
}

export default CartListItem
