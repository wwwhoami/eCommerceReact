import { Box } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/HeaderNav'
import CartPage from './pages/CartPage'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'

function App() {
	return (
		<Router>
			<Header />
			<Box my="5" mt="14" mx={{ sm: '4', md: '10' }} minH="85vh">
				<Route path="/" component={HomePage} exact />
				<Route path="/product/:id" component={ProductPage} />
				<Route path="/cart" component={CartPage} />
			</Box>
			<Footer />
		</Router>
	)
}

export default App
