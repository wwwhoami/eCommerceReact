import { Box, Center } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginForm from './components/user/LoginForm'
import Footer from './components/util/Footer'
import Header from './components/nav/HeaderNav'
import CartPage from './pages/CartPage'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import axios from 'axios'

function App() {
	useEffect(() => {
		;(async () => {
			const { data } = await axios.get('/api/csrf-token')
			axios.defaults.headers['X-CSRF-Token'] = data.csrfToken
		})()
	}, [])

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
					<Route path="/user" component={LoginForm} />
				</Box>
			</Center>
			<Footer />
		</Router>
	)
}

export default App
