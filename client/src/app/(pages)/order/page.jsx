import { getOrderByUserId } from '@/api/orderApi'
import OrderToShow from './OrderToShow'
import Link from 'next/link'
import Image from 'next/image'

const page = async ({ searchParams }) => {
  const order = await getOrderByUserId(searchParams.userId)

  // console.log(order, order?.length)

  return (
    <>
      {order && order?.length !== 0 ? (
        <div className="grid items-around text-white justify-center xl:px-0 sm:px-5 px-2 xl:pt-44 pt-24 gap-5">
          <div className="mx-auto text-center inline-block">
            <h1 className="md:text-5xl sm:text-4xl text-3xl">Your Orders</h1>
            <div className="w-[70%] h-1 rounded-md bg-white mt-3"></div>
          </div>
          <div className="grid grid-cols-4 justify-between items-center sm:text-2xl text-[15px] font-semibold">
            <div className="md:w-56 sm:w-40 w-24  text-center">Products</div>
            <div className="text-center">Prices</div>
            <div className="text-center">Quantity</div>
            <div className="text-center">Totals</div>
          </div>
          {order?.map((item, i) => {
            return (
              <div key={i} className="grid gap-5">
                <hr />
                <OrderToShow order={item?.products} originalOrder={item} />
              </div>
            )
          })}
          <div className="flex items-end justify-between w-full">
            <Link
              href={'/store'}
              className="btn bg-white text-black my-[1rem] w-full mx-auto text-lg font-semibold hover:bg-black hover:text-white"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid items-around text-white justify-center pt-44 pb-10">
          <div className="mx-auto">
            <h1 className="md:text-5xl sm:text-4xl text-3xl">
              Order Is empty!
            </h1>
            <div className="w-[70%] h-1 rounded-md bg-white mt-1"></div>
          </div>
          <Image
            src={'/images/no-results.png'}
            height={600}
            width={600}
            alt="no-results"
            className="mx-auto"
          />
          <Link
            href={'/'}
            className="btn md:bg-white gradient-text text-black 2xl:mt-[3.5rem] mt-[1.5rem] mb-[1rem] flex 2xl:w-[15rem] w-[11rem] mx-auto text-lg font-semibold hover:bg-black hover:text-white"
          >
            Back To Home
          </Link>
        </div>
      )}
    </>
  )
}

export default page
