import { getWishlist } from '@/api/productApi'
import Wishlists from './Wishlists'
import Image from 'next/image'
import Link from 'next/link'

const page = async ({ searchParams }) => {
  const product = await getWishlist(searchParams?.userId)
  return (
    <>
      {product?.wishlist && product?.wishlist?.length !== 0 ? (
        <div className="grid items-around text-white  xl:pt-44 pt-24 pb-10 xl:gap-10 gap-5">
          <div className="mx-auto">
            <h1 className="md:text-5xl sm:text-4xl text-3xl">Your WishList</h1>
            <div className="w-[70%] h-1 rounded-md bg-white mt-1"></div>
          </div>
          <div className="flex justify-center items-center mt-10 w-full">
            <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 md:justify-around justify-between items-center w-full text-white 2xl:gap-[7rem] md:gap-[2rem] gap-[2px] md:mx-10 mx-2">
              <Wishlists product={product} />
            </div>
          </div>
          <Link
            href={'/store'}
            className="btn md:bg-white gradient-text text-black 2xl:mt-[3.5rem] mt-[1.5rem] mb-[1rem] flex 2xl:w-[15rem] w-[11rem] mx-auto text-lg font-semibold hover:bg-black hover:text-white"
          >
            Wishlist More
          </Link>
        </div>
      ) : (
        <div className="grid items-around text-white justify-center pt-44 pb-10">
          <div className="mx-auto">
            <h1 className="md:text-5xl sm:text-4xl text-3xl">
              Wishlist is Empty!
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
