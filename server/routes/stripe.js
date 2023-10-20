import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import Stripe from 'stripe'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'

const stripe = Stripe(process.env.SECURITY_KEY)
const router = express.Router()

const clientURL = process.env.CLIENT_URL

router.post('/create-checkout-session', async (req, res) => {
  const metaCart = req.body.cartItem.cart.reduce((acc, curr) => {
    acc.push({
      product: curr.product._id,
      quantity: curr.quantity,
    })
    return acc
  }, [])

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.cartItem?._id,
      cart: JSON.stringify(metaCart),
    },
  })

  const line_items = req.body.cartItem.cart.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item?.product?.title,
          description: item?.product?.description,
          images: [item?.product?.images[0]?.url],
          metadata: {
            id: item?.product?._id,
          },
        },
        unit_amount: item?.product?.price * 100,
      },
      quantity: item?.quantity,
    }
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'BD'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd',
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    line_items,
    mode: 'payment',
    success_url: `${clientURL}/checkout-success`,
    cancel_url: `${clientURL}/`,
  })

  res.send({ url: session?.url })
})

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
    const savedOrder = await newOrder.save()
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

// endpointSecret = process.env.ENDPOINT_SECRET

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    const sig = req.headers['stripe-signature']

    let data
    let eventType

    if (endpointSecret) {
      let event

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
        // console.log('Webhook verified', event)
      } catch (err) {
        // console.log(`Webhook Error: ${err.message}`)
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
