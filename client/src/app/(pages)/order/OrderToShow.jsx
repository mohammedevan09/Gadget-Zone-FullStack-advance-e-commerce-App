'use client'

import Link from 'next/link'
import CartCard from '../cart/CartCard'

const OrderToShow = ({ order, originalOrder }) => {
  const date = new Date(originalOrder?.createdAt)
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  const formattedDate = date.toLocaleDateString(undefined, options)

  return (
    <>
      {order?.map((item, i) => (
        <CartCard item={item} key={i} isOrder={true} />
      ))}
      <div className="md:flex grid items-end md:justify-between justify-center">
        <h2 className="md:text-2xl text-lg mb-4 text-gray-400 md:order-none order-2 md:text-left text-right">
          {formattedDate}
        </h2>
        <div className="grid items-center justify-end gap-2 text-right">
          <div className="md:text-2xl text-lg text-right">
            SubTotal:{' '}
            <span className="font-semibold text-purple-500">
              $ {originalOrder?.subtotal / 100}
            </span>
          </div>
          <p className="md:text-xl text-md text-left">
            Taxes and shipping calculated at checkout
          </p>
        </div>
      </div>
    </>
  )
}

export default OrderToShow
