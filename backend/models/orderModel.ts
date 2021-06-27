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
		address: string
		city: string
		portalCode: string
		country: string
	}
	paymentMethod: {
		id: string

		status?: string
		updateTime?: string
		emailAddress?: string
	}
	taxPrice: number
	shippingPrice: number
	totalPrice: number
	isPaid: boolean
	paidAt?: Date
	isDelivered: boolean
	deliveredAt?: Date
}

const orderSchema = new mongoose.Schema(
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
			address: { type: String, required: true },
			city: { type: String, required: true },
			portalCode: { type: String, required: true },
			country: { type: String, required: true },
		},
		paymentMethod: {
			id: { type: String, required: true },

			status: { type: String },
			updateTime: { type: String },
			emailAddress: { type: String },
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
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
)

const Product = mongoose.model<OrderDocument>('order', orderSchema)

export default Product