import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users'
import products from './data/products'
import Order from './models/orderModel'
import Product from './models/productModel'
import User from './models/userModel'
import connectDB from './config/db'

dotenv.config()

connectDB()

const deleteData = async () => {
	try {
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		console.log('Data deleted!')
		process.exit()
	} catch (error) {
		console.error(`Error: ${error}`)
		process.exit(1)
	}
}

const importData = async () => {
	try {
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		const createdUsers = await User.insertMany(users)

		const adminUser = await createdUsers[0].id

		const sampleProducts = products.map((product) => ({
			...product,
			user: adminUser,
		}))

		await Product.insertMany(sampleProducts)

		console.log('Data imported!')
		process.exit()
	} catch (error) {
		console.error(`Error: ${error}`)
		process.exit(1)
	}
}

if (process.argv[2] === '-d') {
	deleteData()
} else {
	importData()
}
