import express from 'express'
import { checkAuth } from './../../middleware/authMiddleware'
import { createOrder } from './../controllers/orderController'

const orderRouter = express.Router()

orderRouter.route('/').post(checkAuth, createOrder)

export default orderRouter
