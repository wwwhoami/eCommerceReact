import {
	Button,
	Center,
	chakra,
	Grid,
	HStack,
	IconButton,
	Image,
	Input,
	Skeleton,
	Stack,
	StackDivider,
	Text,
	useToast,
} from '@chakra-ui/react'
import { faCartPlus, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import Message from '../components/Message'
import PageHeader from '../components/PageHeader'
import Rating from '../components/Rating'
import {
	addToCart,
	getCartItemQuantity,
	itemCanBeAddedToCart,
} from '../reducers/cartReducer'
import {
	fetchProductById,
	getProductDetailsState,
} from '../reducers/productDetailsReducer'
interface Params {
	id: string
}

const ProductPage = ({ match, location }: RouteComponentProps<Params>) => {
	const dispatch = useDispatch()
	const { product, status, error } = useSelector(getProductDetailsState)
	const [quantity, setQuantity] = useState(0)
	const itemId = product?._id
	const quantityInCart = useSelector(getCartItemQuantity)(itemId)
	const canBeAddedToCartStore = useSelector(itemCanBeAddedToCart)(itemId)
	const availableQuantity = (product?.countInStock || 0) - quantityInCart
	const toast = useToast()

	useEffect(() => {
		dispatch(fetchProductById(match.params.id))
	}, [dispatch, match])

	useEffect(() => {
		const quantityQuerry = Number(location.search.split('=')[1])
		if (quantityQuerry <= availableQuantity) setQuantity(quantityQuerry)
		else setQuantity(availableQuantity)
	}, [availableQuantity, canBeAddedToCartStore, dispatch, location.search])

	const addToCartHandler = () => {
		if (itemId) {
			dispatch(addToCart({ itemId, quantity }))
			toast({
				title: 'Item added to cart.',
				description: `Added ${quantity} item(s)`,
				status: 'success',
				duration: 4000,
				isClosable: true,
			})
		}
	}

	return (
		<>
			<PageHeader>Product page</PageHeader>

			{status === 'error' ? (
				<Message status="error">Error: {error?.message}</Message>
			) : (
				<Center>
					<Grid
						templateColumns={{ lg: '6fr 3fr 4fr' }}
						gap={{ sm: '40px', md: '50px' }}
						maxW="1400px"
						mt="3"
					>
						<Skeleton isLoaded={status === 'finished'}>
							<Stack isTruncated dir="column" spacing="3">
								<chakra.h1 fontSize="3xl" whiteSpace="initial">
									{product?.name}
								</chakra.h1>
								<Image
									src={product?.image}
									alt={product?.name}
									fit="cover"
									align="center"
								></Image>
							</Stack>
						</Skeleton>
						<Skeleton isLoaded={status === 'finished'}>
							<Stack
								dir="column"
								spacing="4"
								divider={<StackDivider borderColor="gray.300" />}
								justify={{ sm: 'center', md: 'start' }}
							>
								<Rating
									value={product?.rating || 0}
									text={`${product?.numReviews} reviews`}
									fontSize="2xl"
									iconSize={6}
								/>
								<chakra.h2 fontSize="xl">Price: ${product?.price}</chakra.h2>

								<chakra.p fontSize="md">{product?.description}</chakra.p>
							</Stack>
						</Skeleton>
						<Skeleton isLoaded={status === 'finished'}>
							<Stack
								dir="column"
								spacing="10"
								justify="center"
								p={6}
								bg="white"
								maxH={{ md: '400px' }}
								borderWidth="1px"
								rounded="lg"
								shadow="lg"
							>
								<Text as="h2" fontSize="xl">
									Status:{' '}
									<chakra.strong
										color={
											(product?.countInStock || 0) > 0 ? 'green.600' : 'red.600'
										}
									>
										{(product?.countInStock || 0) > 0
											? 'In Stock'
											: 'Out Of Stock'}
									</chakra.strong>
								</Text>
								<Text as="h2" fontSize="xl">
									Total price:{' '}
									<chakra.strong>
										${((product?.price || 0) * quantity).toFixed(2)}
									</chakra.strong>
								</Text>
								<HStack maxW="200px" alignSelf="center" justifySelf="center">
									<IconButton
										aria-label="Decrement quantity"
										size="sm"
										onClick={() =>
											quantity > availableQuantity
												? setQuantity(availableQuantity)
												: setQuantity((prev) => prev - 1)
										}
										disabled={quantity <= 0}
										icon={<FontAwesomeIcon icon={faMinus} />}
									></IconButton>
									<Input
										pr="4.5rem"
										type="text"
										value={quantity}
										variant="filled"
										onChange={(e) => {
											const parsedQty = Number.parseInt(e.target.value)
											if (parsedQty) {
												if (parsedQty > availableQuantity)
													return setQuantity(availableQuantity)
												else if (parsedQty >= 0) return setQuantity(parsedQty)
											}
											return setQuantity(0)
										}}
										isInvalid={
											(quantity > availableQuantity ||
												!canBeAddedToCartStore) &&
											quantity !== 0
										}
									/>
									<IconButton
										aria-label="Increment quantity"
										size="sm"
										onClick={() =>
											quantity < 0
												? setQuantity(0)
												: setQuantity((prev) => prev + 1)
										}
										disabled={
											!canBeAddedToCartStore || quantity >= availableQuantity
										}
										icon={<FontAwesomeIcon icon={faPlus} />}
									></IconButton>
								</HStack>
								<Button
									leftIcon={<FontAwesomeIcon icon={faCartPlus} />}
									onClick={addToCartHandler}
									disabled={
										!canBeAddedToCartStore ||
										quantity > availableQuantity ||
										quantity <= 0
									}
									colorScheme="green"
								>
									Add to cart
								</Button>
							</Stack>
						</Skeleton>
					</Grid>
				</Center>
			)}
		</>
	)
}

export default ProductPage
