import { getCart } from '@/api/userApi'
import CartToShow from './CartToShow'
import Link from 'next/link'
import Image from 'next/image'

const page = async ({ searchParams }) => {
  const cartItem = await getCart(searchParams?.userId)

  return (
    <>
      {cartItem?.cart && cartItem?.cart?.length !== 0 ? (
        <CartToShow cart={cartItem?.cart} />
      ) : (
        <div className="grid items-around text-white justify-center md:px-0 px-5 xl:pt-44 pt-24 pb-10">
          <div className="mx-auto">
            <h1 className="md:text-5xl sm:text-4xl text-3xl">Cart Is empty!</h1>
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
            className="btn bg-white text-black mb-[1rem] w-[15rem] mx-auto text-lg font-semibold hover:bg-black hover:text-white"
          >
            Back To Home
          </Link>
        </div>
      )}
    </>
  )
}

export default page
