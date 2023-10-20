import React from 'react'
import Title from '@/components/Title'
import Link from 'next/link'
import { BsFillStarFill } from 'react-icons/bs'
import Image from 'next/image'

const OneOrder = ({ data, totalCount }) => {
  return (
    <div className="h-screen overflow-y-scroll px-3">
      <Title
        title={`Order by ${data?.shipping?.name}`}
        subtitle={'Only one order is shown!'}
      />
      <div className="my-10"></div>
      {data?.products?.map((item, i) => {
        return (
          <div
            key={i}
            className="mb-5 border-t py-2 flex justify-between items-start gap-2"
          >
            <div className="break-word grid gap-1">
              <div>
                <span className="font-semibold"> Title - </span>
                {item?.product?.title}
              </div>
              <div>
                <span className="font-semibold"> Description - </span>
                {item?.product?.description}
              </div>
              <div>
                {' '}
                <span className="font-semibold"> Price - </span>
                {item?.product?.price}
              </div>
              <div>
                {' '}
                <span className="font-semibold"> Category - </span>
                {item?.product?.category}
              </div>
              <div>
                {' '}
                <span className="font-semibold"> Brand - </span>
                {item?.product?.brand}
              </div>
              <div>
                {' '}
                <span className="font-semibold"> Count - </span>
                {item?.quantity}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold"> Total Ratings - </span>
                {item?.product?.totalRating}
                <BsFillStarFill size={12} />
              </div>
            </div>
            <div>
              <Image
                width={300}
                height={300}
                src={item?.product?.images[0]?.url}
                alt="image"
              />
            </div>
          </div>
        )
      })}
      <div className="border-2 border-white my-6"></div>
      <div className="md:text-2xl text-lg font-semibold">
        <h2 className="order-h2">Total - {totalCount}</h2>
        <h2 className="order-h2">
          Total Price - {Number(data?.subtotal / 100).toFixed(2)}
        </h2>
        <h2 className="order-h2">
          Address -{' '}
          {data?.shipping?.address?.city +
            ' ,' +
            data?.shipping?.address?.country}
        </h2>
        <h2 className="order-h2">
          Payment Intent ID - {data?.paymentIntentId}
        </h2>
        <h2 className="order-h2">Delivery Status - {data?.delivery_status}</h2>
        <h2 className="order-h2">Payment Status - {data?.payment_status}</h2>
        <h2 className="order-h2">Order By - {data?.shipping?.email}</h2>
        <h2 className="order-h2">Phone No - {data?.shipping?.phone}</h2>
      </div>
      <div className="w-full text-center mt-6">
        <Link
          target="_blank"
          href={'/dashboard/orders'}
          className="btn bg-white text-black mb-[1rem] w-full mx-auto md:text-2xl text-lg font-semibold p-2 hover:bg-black hover:text-white transition-all duration-300 border border-white rounded-md"
        >
          Back to Order List
        </Link>
      </div>
      <div className="my-32"></div>
    </div>
  )
}

export default OneOrder
