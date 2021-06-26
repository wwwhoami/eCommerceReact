import express from 'express'
import productsRouter from './routes/productsRouter'

const apiRouter = express.Router()

apiRouter.use('/products', productsRouter)

export default apiRouter