import { Box, Center } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createAxiosResponseInterceptor, getCsrfToken } from './api'
import Header from './components/nav/HeaderNav'
import AuthenticatedRoute from './components/util/AuthenticatedRoute'
import Footer from './components/util/Footer'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import OrderPage from './pages/OrderPage'
import OrdersHistoryPage from './pages/OrdersHistoryPage'
import ProductPage from './pages/ProductPage'
import { fetchUserData } from './reducers/userReducer'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		getCsrfToken()

		createAxiosResponseInterceptor()
		dispatch(fetchUserData())
	}, [dispatch])

	return (
		<Router>
			<Center>
				<Header />
				<Box
					my="5"
					mt="14"
					mx={{ sm: '4', md: '6', lg: '8' }}
					minH="85vh"
					maxW="1200px"
					w="100%"
				>
					<Switch>
						<Route path="/" component={HomePage} exact />
						<Route path="/product/:id" component={ProductPage} />
						<Route path="/cart" component={CartPage} />
						<AuthenticatedRoute
							path="/user/order-history"
							component={OrdersHistoryPage}
						/>
						<AuthenticatedRoute path="/checkout" component={CheckoutPage} />
						<AuthenticatedRoute path="/order/:id" component={OrderPage} />
					</Switch>
				</Box>
			</Center>
			<Footer />
		</Router>
	)
}

export default App
