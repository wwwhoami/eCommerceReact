import { model, Schema } from 'mongoose'

type TokenDocument = Document & {
	token: string
}

const tokenSchema = new Schema<TokenDocument>({
	token: { type: String },
})

const Token = model<TokenDocument>('Token', tokenSchema)

export default Token
