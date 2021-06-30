import express from 'express'
import productsRouter from './routes/productsRouter'
import usersRouter from './routes/usersRouter'

const apiRouter = express.Router()

apiRouter.use('/products', productsRouter)
apiRouter.use('/users', usersRouter)

export default apiRouter
