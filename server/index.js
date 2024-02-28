import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

import dbConnect from './config/dbConnect.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

import authRouter from './routes/authRoutes.js'
import productRouter from './routes/productRoutes.js'
import blogRouter from './routes/blogRoutes.js'
import categoryRouter from './routes/categoryRoute.js'
import blogCategoryRouter from './routes/blogCateRoutes.js'
import brandRouter from './routes/brandRoutes.js'
import couponRouter from './routes/couponRoutes.js'
import colorRouter from './routes/colorRoutes.js'
import enqRouter from './routes/enqRoutes.js'
import stripeRouter from './routes/payment/stripe.js'
import stripeWebhookRouter from './routes/payment/stripeWebhook.js'
import orderRouter from './routes/orderRoutes.js'
// import uploadRouter from './routes/uploadRoutes.js'

dbConnect()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/api/user', authRouter)
app.use('/api/product', productRouter)
app.use('/api/blog', blogRouter)
app.use('/api/category', categoryRouter)
app.use('/api/blogCategory', blogCategoryRouter)
app.use('/api/brand', brandRouter)
app.use('/api/coupon', couponRouter)
app.use('/api/color', colorRouter)
app.use('/api/enquiry', enqRouter)
app.use('/api/order', orderRouter)
app.use('/api/stripe', stripeRouter)
app.use('/', stripeWebhookRouter)
// app.use('/api/upload', uploadRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`)
})
