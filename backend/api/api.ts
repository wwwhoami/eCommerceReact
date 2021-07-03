import { generateRefreshToken } from './controllers/refreshTokenController'
import { getCsrfToken } from './controllers/csrfController'
import express from 'express'
import productsRouter from './routes/productsRouter'
import userRouter from './routes/userRouter'

const apiRouter = express.Router()

apiRouter.route('/csrf-token').get(getCsrfToken)
apiRouter.route('/refresh-token').get(generateRefreshToken)
apiRouter.use('/products', productsRouter)
apiRouter.use('/user', userRouter)

export default apiRouter
