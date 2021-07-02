import dotenv from 'dotenv'
import express from 'express'
import apiRouter from './api/api'
import connectDB from './config/db'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import { errorHandler, notFound } from './middleware/errorMiddleware'

dotenv.config()
connectDB()

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())

app.use(cookieParser())

app.use(
	csrf({
		cookie: true,
	})
)

app.use('/api', apiRouter)

app.use(notFound)

app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port: ${port}`))
