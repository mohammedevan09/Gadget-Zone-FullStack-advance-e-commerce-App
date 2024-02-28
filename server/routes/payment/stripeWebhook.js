import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import Stripe from 'stripe'
import User from '../../models/userModel.js'
import Order from '../../models/orderModel.js'

const stripe = Stripe(process.env.SECURITY_KEY)
const router = express.Router()

// Create Order

const createOrder = async (customer, data, res) => {
  const Items = JSON.parse(customer.metadata.cart)

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customer: data.customer,
    paymentIntentId: data.payment_intent,
    products: Items,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  })

  try {
    await newOrder.save()
    let user = await User.findOne({ _id: customer.metadata.userId })

    if (!user) throw new Error('Cannot find User')

    user.cart = []
    await user.save()
    res.status(200).json(user)
  } catch (e) {
    console.log(e)
  }
}

// Stripe webhook

let endpointSecret

endpointSecret = process.env.ENDPOINT_SECRET

router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  (req, res) => {
    const sig = req.headers['stripe-signature']

    let data
    let eventType

    if (endpointSecret) {
      let event

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
        console.log('Webhook verified', event)
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`)
        res.status(400).send(`Webhook Error: ${err.message}`)
        return
      }

      data = event.data.object
      eventType = event.type
    } else {
      data = req.body.data.object
      eventType = req.body.type
    }

    // Handle the event
    console.log('test', 'checkout.session.completed')
    if (eventType === 'checkout.session.completed') {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          // console.log(customer)
          // console.log('data', data)
          createOrder(customer, data, res)
        })
        .catch((err) => console.log(err.message))
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send().end()
  }
)

export default router
