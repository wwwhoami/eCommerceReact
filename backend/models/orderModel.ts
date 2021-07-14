import mongoose from 'mongoose'

export type OrderDocument = mongoose.Document & {
	user: mongoose.Types.ObjectId
	orderItems: {
		name: string
		quantity: number
		image: string
		price: number
		product: mongoose.Types.ObjectId
	}[]
	shippingAddress: {
		email: string
		country: string
		state: string
		streetAddress: string
		city: string
		postalCode: string
	}
	payment: {
		method: string
		isPaid: boolean
		paidAt?: Date
		status?: string
		updateTime?: string
		emailAddress?: string
	}
	delivery: {
		isDelivered: boolean
		deliveredAt?: Date
	}
	price: {
		itemsPrice: number
		taxPrice: number
		shippingPrice: number
		totalPrice: number
	}
}

const orderSchema = new mongoose.Schema<OrderDocument>(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				name: { type: String, required: true },
				quantity: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				product: { type: mongoose.Schema.Types.ObjectId, required: true },
			},
		],
		shippingAddress: {
			email: { type: String },
			streetAddress: { type: String, required: true },
			state: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true },
		},
		payment: {
			method: { type: String, required: true },
			isPaid: {
				type: Boolean,
				required: true,
				default: false,
			},
			paidAt: {
				type: Date,
			},

			status: { type: String },
			updateTime: { type: String },
			emailAddress: { type: String },
		},
		delivery: {
			isDelivered: {
				type: Boolean,
				required: true,
				default: false,
			},
			deliveredAt: {
				type: Date,
			},
		},
		price: {
			itemsPrice: {
				type: Number,
				required: true,
				default: 0,
			},
			taxPrice: {
				type: Number,
				required: true,
				default: 0,
			},
			shippingPrice: {
				type: Number,
				required: true,
				default: 0,
			},
			totalPrice: {
				type: Number,
				required: true,
				default: 0,
			},
		},
	},
	{
		timestamps: true,
	}
)

const Order = mongoose.model<OrderDocument>('order', orderSchema)

export default Order
