import { Box, Center } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createAxiosResponseInterceptor, getCsrfToken } from './api'
import Header from './components/nav/HeaderNav'
import Footer from './components/util/Footer'
import CartPage from './pages/CartPage'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import UserPage from './pages/UserPage'
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
					<Route path="/" component={HomePage} exact />
					<Route path="/product/:id" component={ProductPage} />
					<Route path="/cart" component={CartPage} />
					<Route path="/user" component={UserPage} />
				</Box>
			</Center>
			<Footer />
		</Router>
	)
}

export default App
