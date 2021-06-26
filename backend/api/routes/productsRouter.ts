import express from 'express'
import mongoose from 'mongoose'
import Product from '../../models/productModel'
import asyncHandler from 'express-async-handler'

const productsRouter = express.Router()

/**
 * @desc   Fetch all products
 * @route  GET /api/products/
 * @access PUBLIC
 */
productsRouter.get(
	'/',
	asyncHandler(async (req, res) => {
		const products = await Product.find({})
		res.status(200).json(products)
	})
)

/**
 * @desc   Fetch product by id
 * @route  GET /api/products/:id
 * @access PUBLIC
 */
productsRouter.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const { id } = req.params
		const product = await Product.findById(id)
		if (product) {
			return res.status(200).json(product)
		}
		res.status(404)
		throw new Error('Product not found!')
	})
)

export default productsRouter
