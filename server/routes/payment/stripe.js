import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import Stripe from 'stripe'

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

export default router
