import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import apiRouter from './api/api'
import connectDB from './config/db'
import { HttpException } from './types'
import { errorHandler, notFound } from './middleware/errorMiddleware'

dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 5000

app.use('/api', apiRouter)

app.use(notFound)

app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port: ${port}`))
